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

def extract_tracks():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    track_pattern = re.compile(r'\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist:\s*"([^"]+)"(.*?)\}', re.DOTALL)
    tracks = []
    for match in track_pattern.finditer(content):
        t_id = int(match.group(1))
        title = match.group(2)
        artist = match.group(3)
        tracks.append({
            "id": t_id,
            "title": title,
            "artist": artist
        })
    return tracks

def download_full_song(track):
    t_id = track["id"]
    title = track["title"]
    artist = track["artist"]
    audio_path = os.path.join(AUDIO_DIR, f"track_{t_id}.mp3")
    cover_path = os.path.join(COVERS_DIR, f"cover_{t_id}.jpg")
    
    # Check if already a full song (> 1.8MB)
    is_full_song = os.path.exists(audio_path) and os.path.getsize(audio_path) >= 1800000
    has_cover = os.path.exists(cover_path) and os.path.getsize(cover_path) > 5000
    
    if is_full_song and has_cover:
        return t_id, f"ALREADY_FULL ({os.path.getsize(audio_path)/1024/1024:.2f} MB)"
    
    query = f"{title} {artist}"
    temp_prefix = os.path.join(AUDIO_DIR, f"full_temp_{t_id}")
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': temp_prefix + '.%(ext)s',
        'ffmpeg_location': ffmpeg_exe,
        'writethumbnail': not has_cover,
        'postprocessors': [
            {'key': 'FFmpegExtractAudio', 'preferredcodec': 'mp3', 'preferredquality': '128'}
        ],
        'quiet': True,
        'no_warnings': True
    }
    if not has_cover:
        ydl_opts['postprocessors'].append({'key': 'FFmpegThumbnailsConvertor', 'format': 'jpg'})
        
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(f"ytsearch1:{query}", download=True)
            
            # Rename audio to track_{id}.mp3
            temp_mp3 = temp_prefix + ".mp3"
            if os.path.exists(temp_mp3):
                if os.path.exists(audio_path):
                    os.remove(audio_path)
                os.rename(temp_mp3, audio_path)
                
            # Rename cover if needed
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
            elif not has_cover and info and 'entries' in info and len(info['entries']) > 0:
                thumb = info['entries'][0].get('thumbnail')
                if thumb:
                    urllib.request.urlretrieve(thumb, cover_path)
                    
            # Cleanup temp files
            for f in os.listdir(AUDIO_DIR):
                if f.startswith(f"full_temp_{t_id}"):
                    try:
                        os.remove(os.path.join(AUDIO_DIR, f))
                    except:
                        pass
                        
        sz = os.path.getsize(audio_path) if os.path.exists(audio_path) else 0
        return t_id, f"SUCCESS ({sz/1024/1024:.2f} MB)"
    except Exception as e:
        return t_id, f"ERROR: {str(e)[:80]}"

def main():
    tracks = extract_tracks()
    print(f"Total tracks to process: {len(tracks)}")
    
    # Check how many need full download
    needs_download = [t for t in tracks if not os.path.exists(os.path.join(AUDIO_DIR, f"track_{t['id']}.mp3")) or os.path.getsize(os.path.join(AUDIO_DIR, f"track_{t['id']}.mp3")) < 1800000]
    print(f"Tracks needing full audio download: {len(needs_download)}/{len(tracks)}")
    
    completed = 0
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(download_full_song, t): t for t in tracks}
        for future in as_completed(futures):
            t_id, status = future.result()
            completed += 1
            print(f"[{completed}/{len(tracks)}] Track #{t_id}: {status}")

    full_count = sum(1 for t in tracks if os.path.exists(os.path.join(AUDIO_DIR, f"track_{t['id']}.mp3")) and os.path.getsize(os.path.join(AUDIO_DIR, f"track_{t['id']}.mp3")) >= 1800000)
    print(f"\nCompleted! Full songs present: {full_count}/{len(tracks)}")

if __name__ == "__main__":
    main()
