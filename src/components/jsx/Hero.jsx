import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Github, Twitter, Instagram } from './Icons';
import { useState, useEffect } from 'react';
import aakashImage from '../../assets/aakash_image.jpg';
import '../styles/Hero.css';

const SOCIALS = [
  { icon: Github,    href: 'https://github.com/ProEvolution03',          label: 'GitHub'    },
  { icon: Twitter,   href: 'https://x.com/aakashtm_03',                   label: 'X.com'     },
  { icon: Instagram, href: 'https://www.instagram.com/aakashsivakumar_/', label: 'Instagram' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

/* ─── Spotify SVG icon ─── */
const SpotifyIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.141C9.6 9.9 15 10.561 18.72 12.841c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.5.36z" />
  </svg>
);

/* ─── Inline Spotify button + popover ─── */
function NowPlaying() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const mockData = {
    isPlaying: true,
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk',
    albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    songUrl: 'https://open.spotify.com/track/7MXVkk9YMqq6vqLSZcgLNu',
  };

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify');
        if (res.ok) {
          const song = await res.json();
          setData(song);
        } else {
          setData(mockData);
        }
      } catch {
        setData(mockData);
      }
    };
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <div className="hero__now-playing" style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        className={`hero__np-btn ${open ? 'hero__np-btn--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="What I'm listening to"
      >
        <SpotifyIcon size={14} />
        <div className="hero__np-eq" aria-hidden="true">
          <span className="eq-bar" />
          <span className="eq-bar" />
          <span className="eq-bar" />
        </div>
        <span className="hero__np-label">
          {data.isPlaying ? 'Now Playing' : 'Not Playing'}
        </span>
      </button>

      {/* Popover card */}
      {open && (
        <motion.div
          className="hero__np-card"
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        >
          {data.isPlaying ? (
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__np-track"
            >
              {data.albumImageUrl && (
                <img
                  src={data.albumImageUrl}
                  alt="Album art"
                  className="hero__np-art"
                />
              )}
              <div className="hero__np-info">
                <span className="hero__np-song">{data.title}</span>
                <span className="hero__np-artist">{data.artist}</span>
                <span className="hero__np-open">Open in Spotify →</span>
              </div>
            </a>
          ) : (
            <div className="hero__np-track">
              <div className="hero__np-info">
                <span className="hero__np-song">Nothing playing right now</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__main container">
        {/* Left: editorial content */}
        <motion.div
          className="hero__content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Stamp badge */}
          <motion.div className="hero__badge" variants={item}>
            <span className="hero__badge-dot" />
            Currently building at CareYu Automation
          </motion.div>

          {/* Editorial heading */}
          <motion.h1 className="hero__title" variants={item}>
            Hi, I'm{' '}
            <span className="hero__name">Aakash Sivakumar</span>
            <br />
            <span className="hero__title-sub">Robotics & Automation Engineer</span>
          </motion.h1>

          {/* Description */}
          <motion.p className="hero__desc" variants={item}>
            I try to bring to life, my dream of introducing robotics to human aid
            in the best possible way possible.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero__actions" variants={item}>
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowDown size={15} />
            </a>
            <a href="#contact" className="btn-ghost">Get in Touch</a>
          </motion.div>

          {/* Socials + Now Playing on same row */}
          <motion.div className="hero__socials-row" variants={item}>
            <div className="hero__socials">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social"
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            <NowPlaying />
          </motion.div>
        </motion.div>

        {/* Right: polaroid portrait */}
        <motion.div
          className="hero__image-wrapper"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hero__polaroid">
            <img src={aakashImage} alt="Aakash Sivakumar" className="hero__image" />
            <span className="hero__polaroid-caption">Aakash, 2025.</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} color="var(--ink-muted)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
