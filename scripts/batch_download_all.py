import os
import re
import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
import yt_dlp
import imageio_ffmpeg

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AUDIO_DIR = os.path.join(BASE_DIR, "public", "audio")
COVERS_DIR = os.path.join(AUDIO_DIR, "covers")
DATA_FILE = os.path.join(BASE_DIR, "src", "data", "soundtrackData.ts")

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(COVERS_DIR, exist_ok=True)

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

def extract_tracks_from_ts(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
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
            "themeColor": themeColor
        })
    return tracks

def download_track(track):
    t_id = track["id"]
    title = track["title"]
    artist = track["artist"]
    audio_path = os.path.join(AUDIO_DIR, f"track_{t_id}.mp3")
    cover_path = os.path.join(COVERS_DIR, f"cover_{t_id}.jpg")
    
    audio_exists = os.path.exists(audio_path) and os.path.getsize(audio_path) > 100000
    cover_exists = os.path.exists(cover_path) and os.path.getsize(cover_path) > 5000
    
    if audio_exists and cover_exists:
        return t_id, "ALREADY_EXISTS"
    
    query = f"{title} {artist}"
    temp_prefix = os.path.join(AUDIO_DIR, f"temp_{t_id}")
    
    # If audio exists, just download thumbnail
    if audio_exists and not cover_exists:
        try:
            with yt_dlp.YoutubeDL({'quiet': True, 'no_warnings': True}) as ydl:
                info = ydl.extract_info(f"ytsearch1:{query}", download=False)
                if info and 'entries' in info and len(info['entries']) > 0:
                    thumb_url = info['entries'][0].get('thumbnail')
                    if thumb_url:
                        urllib.request.urlretrieve(thumb_url, cover_path)
                        return t_id, "THUMBNAIL_DOWNLOADED"
        except Exception as e:
            return t_id, f"THUMB_ERR: {str(e)[:50]}"
    
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
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(f"ytsearch1:{query}", download=True)
            
            temp_mp3 = temp_prefix + ".mp3"
            if os.path.exists(temp_mp3):
                if os.path.exists(audio_path):
                    os.remove(audio_path)
                os.rename(temp_mp3, audio_path)
            
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
            elif info and 'entries' in info and len(info['entries']) > 0:
                thumb_url = info['entries'][0].get('thumbnail')
                if thumb_url:
                    urllib.request.urlretrieve(thumb_url, cover_path)
                    
            for f in os.listdir(AUDIO_DIR):
                if f.startswith(f"temp_{t_id}"):
                    try:
                        os.remove(os.path.join(AUDIO_DIR, f))
                    except:
                        pass
                        
        return t_id, "AUDIO_AND_COVER_DOWNLOADED"
    except Exception as e:
        return t_id, f"ERROR: {str(e)[:80]}"

def update_soundtrack_data_ts(tracks):
    # Re-generate soundtrackData.ts with clean paths to local /audio/track_{id}.mp3 and /audio/covers/cover_{id}.jpg
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
        # Special case for beat_it if needed
        prev_url = f"/audio/track_{t_id}.mp3"
        cover_url = f"/audio/covers/cover_{t_id}.jpg"
        
        # If beat it (id 23)
        if t_id == 23 and os.path.exists(os.path.join(AUDIO_DIR, "beat_it.mp3")):
            prev_url = "/audio/beat_it.mp3"
        # If shape of you (id 106)
        if t_id == 106 and os.path.exists(os.path.join(AUDIO_DIR, "shape_of_you.mp3")):
            prev_url = "/audio/shape_of_you.mp3"
            
        feat_str = ' featured: true,' if tr.get("featured") else ''
        ts_content += f'  {{ id: {t_id}, title: {json.dumps(tr["title"])}, artist: {json.dumps(tr["artist"])}, playlistCategory: {json.dumps(tr["playlistCategory"])}, duration: {json.dumps(tr["duration"])}, vibe: {json.dumps(tr["vibe"])}, bpm: {tr["bpm"]},{feat_str} energyLevel: {tr["energyLevel"]}, themeColor: {json.dumps(tr["themeColor"])}, coverUrl: "{cover_url}", previewUrl: "{prev_url}" }},\n'
    
    ts_content += '];\n'
    
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print("Updated soundtrackData.ts successfully!")

def main():
    print("Reading track list from soundtrackData.ts...")
    tracks = extract_tracks_from_ts(DATA_FILE)
    print(f"Parsed {len(tracks)} tracks.")
    
    print("Starting parallel download with 8 workers...")
    completed = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(download_track, tr): tr for tr in tracks}
        for future in as_completed(futures):
            t_id, status = future.result()
            completed += 1
            if completed % 10 == 0 or completed == len(tracks) or "ERROR" in status:
                print(f"[{completed}/{len(tracks)}] Track #{t_id}: {status}")

    print("Checking results...")
    audio_count = sum(1 for tr in tracks if os.path.exists(os.path.join(AUDIO_DIR, f"track_{tr['id']}.mp3")) or (tr['id'] == 23 and os.path.exists(os.path.join(AUDIO_DIR, 'beat_it.mp3'))) or (tr['id'] == 106 and os.path.exists(os.path.join(AUDIO_DIR, 'shape_of_you.mp3'))))
    cover_count = sum(1 for tr in tracks if os.path.exists(os.path.join(COVERS_DIR, f"cover_{tr['id']}.jpg")))
    print(f"Audios present: {audio_count}/150")
    print(f"Covers present: {cover_count}/150")
    
    update_soundtrack_data_ts(tracks)

if __name__ == "__main__":
    main()
