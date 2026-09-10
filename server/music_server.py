import os
import sys
import json
import re
import urllib.request
from http.server import HTTPServer, BaseHTTPRequestHandler
import yt_dlp
import imageio_ffmpeg

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AUDIO_DIR = os.path.join(BASE_DIR, "public", "audio")
COVERS_DIR = os.path.join(AUDIO_DIR, "covers")
DATA_FILE = os.path.join(BASE_DIR, "src", "data", "soundtrackData.ts")

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(COVERS_DIR, exist_ok=True)

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

def format_duration(seconds):
    if not seconds or seconds <= 0:
        return "3:30"
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m}:{s:02d}"

def extract_tracks_from_ts():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    track_pattern = re.compile(r'\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist:\s*"([^"]+)"(.*?)\}', re.DOTALL)
    tracks = []
    for match in track_pattern.finditer(content):
        t_id = int(match.group(1))
        title = match.group(2)
        artist = match.group(3)
        rest = match.group(4)
        
        cat_m = re.search(r'playlistCategory:\s*"([^"]+)"', rest)
        playlistCategory = cat_m.group(1) if cat_m else "All"
        
        dur_m = re.search(r'duration:\s*"([^"]+)"', rest)
        duration = dur_m.group(1) if dur_m else "3:30"
        
        vibe_m = re.search(r'vibe:\s*"([^"]+)"', rest)
        vibe = vibe_m.group(1) if vibe_m else "Vibe"
        
        bpm_m = re.search(r'bpm:\s*(\d+)', rest)
        bpm = int(bpm_m.group(1)) if bpm_m else 100
        
        feat_m = re.search(r'featured:\s*(true|false)', rest)
        featured = (feat_m.group(1) == "true") if feat_m else False
        
        energy_m = re.search(r'energyLevel:\s*(\d+)', rest)
        energyLevel = int(energy_m.group(1)) if energy_m else 50
        
        theme_m = re.search(r'themeColor:\s*"([^"]+)"', rest)
        themeColor = theme_m.group(1) if theme_m else "#10b981"
        
        cover_m = re.search(r'coverUrl:\s*"([^"]+)"', rest)
        coverUrl = cover_m.group(1) if cover_m else f"/audio/covers/cover_{t_id}.jpg"

        prev_m = re.search(r'previewUrl:\s*"([^"]+)"', rest)
        previewUrl = prev_m.group(1) if prev_m else f"/audio/track_{t_id}.mp3"
        
        tracks.append({
            "id": t_id,
            "title": title,
            "artist": artist,
            "playlistCategory": playlistCategory,
            "duration": duration,
            "vibe": vibe,
            "bpm": bpm,
            "featured": featured,
            "energyLevel": energyLevel,
            "themeColor": themeColor,
            "coverUrl": coverUrl,
            "previewUrl": previewUrl
        })
    return tracks

def save_tracks_to_ts(tracks):
    ts_content = '''import type { TrackItem } from '../types';

export const soundtrackPlaylists = [
  { id: 'all', name: 'All 150 Tracks', icon: '', count: 150, color: 'from-pink-500 to-sky-400' },
  { id: 'repeat', name: 'Forever on Repeat', icon: '', count: 25, color: 'from-amber-400 to-yellow-500' },
  { id: 'late-night', name: 'Late Night', icon: '', count: 35, color: 'from-indigo-500 to-purple-600' },
  { id: 'energy', name: 'Energy Mode', icon: '', count: 30, color: 'from-orange-500 to-red-600' },
  { id: 'soft', name: 'Soft Hours', icon: '', count: 30, color: 'from-pink-400 to-rose-500' },
  { id: 'indie', name: 'Indie Side', icon: '', count: 10, color: 'from-emerald-400 to-teal-500' },
  { id: 'pop', name: 'Pop Rotation', icon: '', count: 20, color: 'from-sky-400 to-blue-500' },
];

export const allTracks: TrackItem[] = [
'''
    for tr in tracks:
        t_id = tr["id"]
        feat_str = ' featured: true,' if tr.get("featured") else ''
        cov = tr.get("coverUrl", f"/audio/covers/cover_{t_id}.jpg")
        prev = tr.get("previewUrl", f"/audio/track_{t_id}.mp3")
        ts_content += f'  {{ id: {t_id}, title: {json.dumps(tr["title"])}, artist: {json.dumps(tr["artist"])}, playlistCategory: {json.dumps(tr["playlistCategory"])}, duration: {json.dumps(tr["duration"])}, vibe: {json.dumps(tr["vibe"])}, bpm: {tr["bpm"]},{feat_str} energyLevel: {tr["energyLevel"]}, themeColor: {json.dumps(tr["themeColor"])}, coverUrl: "{cov}", previewUrl: "{prev}" }},\n'
    
    ts_content += '];\n'
    
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)

def process_youtube_download(source_query, custom_title=None, custom_artist=None, playlist_category="Late Night", track_id=None):
    tracks = extract_tracks_from_ts()
    
    if track_id is None:
        track_id = max([t["id"] for t in tracks], default=0) + 1
    
    target_id = int(track_id)
    temp_prefix = os.path.join(AUDIO_DIR, f"yt_temp_{target_id}")
    audio_path = os.path.join(AUDIO_DIR, f"track_{target_id}.mp3")
    cover_path = os.path.join(COVERS_DIR, f"cover_{target_id}.jpg")
    
    is_url = source_query.startswith("http://") or source_query.startswith("https://")
    query = source_query if is_url else f"ytsearch1:{source_query}"
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': temp_prefix + '.%(ext)s',
        'ffmpeg_location': ffmpeg_exe,
        'writethumbnail': True,
        'postprocessors': [
            {'key': 'FFmpegExtractAudio', 'preferredcodec': 'mp3', 'preferredquality': '128'},
            {'key': 'FFmpegThumbnailsConvertor', 'format': 'jpg'}
        ],
        'quiet': True,
        'no_warnings': True
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(query, download=True)
        
        entry = info['entries'][0] if 'entries' in info and len(info['entries']) > 0 else info
        raw_title = entry.get('title', 'Unknown Title')
        uploader = entry.get('uploader', 'Unknown Artist')
        duration_sec = entry.get('duration', 210)
        
        # Clean title & artist
        title = custom_title or raw_title
        artist = custom_artist or uploader
        if not custom_title and " - " in raw_title:
            parts = raw_title.split(" - ", 1)
            artist = parts[0].strip()
            title = parts[1].strip()
            
        # Clean up unwanted suffixes like (Official Video), (Audio), etc.
        title = re.sub(r'[\(\[\{].*?(official|video|audio|lyrics|hd|4k|remastered).*?[\)\]\}]', '', title, flags=re.IGNORECASE).strip()

        # Move audio
        temp_mp3 = temp_prefix + ".mp3"
        if os.path.exists(temp_mp3):
            if os.path.exists(audio_path):
                os.remove(audio_path)
            os.rename(temp_mp3, audio_path)
            
        # Move thumbnail
        temp_jpg = temp_prefix + ".jpg"
        temp_webp = temp_prefix + ".webp"
        if os.path.exists(temp_jpg):
            if os.path.exists(cover_path):
                os.remove(cover_path)
            os.rename(temp_jpg, cover_path)
        elif os.path.exists(temp_webp):
            if os.path.exists(cover_path):
                os.remove(cover_path)
            os.rename(temp_webp, cover_path)
        else:
            thumb_url = entry.get('thumbnail')
            if thumb_url:
                urllib.request.urlretrieve(thumb_url, cover_path)
                
        # Clean leftovers
        for f in os.listdir(AUDIO_DIR):
            if f.startswith(f"yt_temp_{target_id}"):
                try:
                    os.remove(os.path.join(AUDIO_DIR, f))
                except:
                    pass

    new_track = {
        "id": target_id,
        "title": title,
        "artist": artist,
        "playlistCategory": playlist_category,
        "duration": format_duration(duration_sec),
        "vibe": "Studio Master / High Fidelity",
        "bpm": 110,
        "featured": True,
        "energyLevel": 80,
        "themeColor": "#10b981",
        "coverUrl": f"/audio/covers/cover_{target_id}.jpg",
        "previewUrl": f"/audio/track_{target_id}.mp3"
    }
    
    # Update or append in dataset
    existing_idx = next((i for i, t in enumerate(tracks) if t["id"] == target_id), -1)
    if existing_idx >= 0:
        tracks[existing_idx] = new_track
    else:
        tracks.append(new_track)
        
    save_tracks_to_ts(tracks)
    return new_track

class MusicRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == '/api/health' or self.path == '/api/status':
            self._set_headers(200)
            tracks = extract_tracks_from_ts()
            audio_count = len([f for f in os.listdir(AUDIO_DIR) if f.endswith('.mp3')])
            cover_count = len([f for f in os.listdir(COVERS_DIR) if f.endswith('.jpg') or f.endswith('.webp')])
            self.wfile.write(json.dumps({
                "status": "online",
                "totalTracks": len(tracks),
                "audioFiles": audio_count,
                "coverFiles": cover_count
            }).encode('utf-8'))
        elif self.path == '/api/tracks':
            self._set_headers(200)
            tracks = extract_tracks_from_ts()
            self.wfile.write(json.dumps(tracks).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            body = json.loads(post_data.decode('utf-8')) if post_data else {}
        except Exception as e:
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": f"Invalid JSON: {str(e)}"}).encode('utf-8'))
            return

        if self.path == '/api/download-yt' or self.path == '/api/search-and-download':
            url_or_query = body.get('url') or body.get('query')
            if not url_or_query:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Missing 'url' or 'query' parameter"}).encode('utf-8'))
                return

            custom_title = body.get('title')
            custom_artist = body.get('artist')
            category = body.get('playlistCategory', 'Late Night')
            track_id = body.get('trackId')

            try:
                track = process_youtube_download(
                    source_query=url_or_query,
                    custom_title=custom_title,
                    custom_artist=custom_artist,
                    playlist_category=category,
                    track_id=track_id
                )
                self._set_headers(200)
                self.wfile.write(json.dumps({
                    "success": True,
                    "message": "Track and original thumbnail downloaded and saved successfully!",
                    "track": track
                }).encode('utf-8'))
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": f"Download failed: {str(e)}"}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

def run_server(port=5005):
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, MusicRequestHandler)
    print(f"Music Downloader API server running on http://127.0.0.1:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print("Server stopped.")

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5005
    run_server(port)
