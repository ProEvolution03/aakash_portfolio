import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitBranch, Star, Check } from 'lucide-react';
import '../styles/ProjectModal.css';

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.86, y: 32 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 },
  },
  exit: {
    opacity: 0, scale: 0.9, y: 24,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const { title, color, tags, stars, featured, longDesc, features, github } = project;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="pm-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`${title} details`}
      >
        <motion.div
          className="pm-panel glass-card"
          style={{ '--pm-color': color }}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── IMAGE / PREVIEW AREA ── */}
          <div className="pm-preview" aria-hidden="true">
            {/* Ambient glow blob */}
            <div className="pm-preview__glow" />

            {/* Fake browser chrome */}
            <div className="pm-preview__chrome">
              <span className="pm-preview__dot pm-preview__dot--red"   />
              <span className="pm-preview__dot pm-preview__dot--amber" />
              <span className="pm-preview__dot pm-preview__dot--green" />
              <span className="pm-preview__url">{title.toLowerCase().replace(/\s+/g, '-')}.app</span>
            </div>

            {/* Mock UI content skeleton */}
            <div className="pm-preview__content">
              <div className="pm-preview__sidebar">
                <span /><span /><span /><span /><span />
              </div>
              <div className="pm-preview__main">
                <div className="pm-preview__topbar" />
                <div className="pm-preview__cards">
                  <span /><span /><span />
                </div>
                <div className="pm-preview__rows">
                  <span /><span /><span /><span />
                </div>
              </div>
            </div>
          </div>

          {/* ── HEADER ── */}
          <div className="pm-header">
            <div className="pm-header__top">
              {featured && <span className="pm-badge">Featured</span>}
              <button className="pm-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
            <h2 className="pm-title">{title}</h2>
            <div className="pm-tags">
              {tags.map((t) => (
                <span key={t} className="pm-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="pm-body">
            <div className="pm-stats">
              <span className="pm-stat">
                <Star size={14} />
                <strong>{stars}</strong> stars
              </span>
              <span className="pm-divider" />
              <span className="pm-stat pm-stat--open">Open Source</span>
            </div>

            <div className="pm-section">
              <h3 className="pm-section__label">About</h3>
              <p className="pm-section__text">{longDesc}</p>
            </div>

            <div className="pm-section">
              <h3 className="pm-section__label">Key Features</h3>
              <ul className="pm-features">
                {features.map((f) => (
                  <li key={f} className="pm-feature">
                    <span className="pm-feature__dot"><Check size={11} /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Only View Source button */}
            <div className="pm-actions">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn--primary"
              >
                <GitBranch size={15} />
                View Source
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
