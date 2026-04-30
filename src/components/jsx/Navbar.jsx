import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ResumeModal from './ResumeModal';
import AakashIcon from '../../assets/aakash_icon.png';
import '../styles/Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);

  /* Dispatch radial flash centred on click position */
  const fireFlash = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent('nav-transition', {
        detail: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      })
    );
  };

  /* Track scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Highlight active section on scroll */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const label = NAV_LINKS.find(l => l.href === `#${e.target.id}`)?.label;
            if (label) setActive(label);
          }
        });
      },
      { threshold: 0.45 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Distortion Filter Removed for Transparency Optimization */}
      
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="navbar__container">
          <div className="navbar__logo">
            <img src={AakashIcon} alt="Aakash Sivakumar" className="navbar__custom-icon" />
          </div>

          <div className={`navbar__glass ${scrolled ? 'navbar__glass--scrolled' : ''}`}>
            <div className="navbar__lens" aria-hidden="true" />
            <div className="navbar__specular" aria-hidden="true" />
            <div className="navbar__shimmer" aria-hidden="true" />

            {/* Optimized desktop links using layoutId */}
            <div className="navbar__links">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`navbar__link ${active === label ? 'navbar__link--active' : ''}`}
                  onClick={(e) => { setActive(label); fireFlash(e); }}
                >
                  {active === label && (
                    <motion.span
                      layoutId="nav-pill"
                      className="navbar__pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="navbar__link-text">{label}</span>
                </a>
              ))}
            </div>

            <button onClick={() => setShowResume(true)} className="navbar__cta">
              View Resume
            </button>

            <button
              className="navbar__hamburger"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex' }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                className="mobile-menu__link"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045 }}
                onClick={() => { setActive(label); setOpen(false); }}
              >
                {label}
              </motion.a>
            ))}
            <button
              className="mobile-menu__cta"
              onClick={() => { setOpen(false); setShowResume(true); }}
            >
              View Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>
    </>
  );
}
