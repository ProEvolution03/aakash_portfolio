import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SpotifyWidget.css';

// Custom Spotify SVG since lucide doesn't have brand icons
const SpotifyIcon = ({ size = 24, fill = "#1DB954", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} {...props}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.141C9.6 9.9 15 10.561 18.72 12.841c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.5.36z" />
  </svg>
);

export default function SpotifyWidget() {
  const [data, setData] = useState({ isPlaying: false });
  const [loading, setLoading] = useState(true);

  // MOCK DATA GENERATOR (Fallback for Development without Backend)
  const mockSpotifyData = () => ({
    isPlaying: true,
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk',
    albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    songUrl: 'https://open.spotify.com/track/7MXVkk9YMqq6vqLSZcgLNu',
  });

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        // This attempts to fetch from the serverless function.
        // Change '/api/spotify' to your deployed Vercel API URL once hosted.
        const res = await fetch('/api/spotify');
        
        if (res.ok) {
          const song = await res.json();
          setData(song);
        } else {
          // If API fails or isn't set up yet, use mock data gracefully.
          setData(mockSpotifyData());
        }
      } catch (err) {
        // Fallback if backend is unreachable completely
        setData(mockSpotifyData());
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  return (
    <motion.div 
      className="spotify-widget glass-card"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 2 }}
    >
      <div className="spotify__icon-wrapper">
        <SpotifyIcon size={26} />
      </div>

      <div className="spotify__content">
        {data.isPlaying ? (
          <>
            <div className="spotify__status">
              <span className="spotify__label">Listening on Spotify</span>
              <div className="spotify__eq">
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
            </div>
            <a href={data.songUrl} target="_blank" rel="noreferrer" className="spotify__track">
              <span className="spotify__title">{data.title}</span>
              <span className="spotify__artist">• {data.artist}</span>
            </a>
          </>
        ) : (
          <>
            <span className="spotify__label">Not listening</span>
            <span className="spotify__title">Spotify</span>
          </>
        )}
      </div>

      {data.isPlaying && data.albumImageUrl && (
        <a href={data.songUrl} target="_blank" rel="noreferrer" className="spotify__album-art">
          <img src={data.albumImageUrl} alt="Album Art" className="spotify__album-img" />
          <div className="spotify__vinyl-hole" />
        </a>
      )}
    </motion.div>
  );
}
