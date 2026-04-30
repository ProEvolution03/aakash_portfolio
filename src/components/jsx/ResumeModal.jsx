import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import '../styles/ResumeModal.css';

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

export default function ResumeModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="rm-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Resume"
      >
        <motion.div
          className="rm-panel glass-card"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="rm-header">
            <h2 className="rm-title">Curriculum Vitae</h2>
            <button className="rm-close" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {/* Actual Document Preview */}
          <div className="rm-body">
            <iframe 
              src="/aakash_resume.pdf#view=FitH" 
              className="rm-iframe" 
              title="Resume Preview"
            />
          </div>

          {/* Footer Action */}
          <div className="rm-footer">
            <a href="/aakash_resume.pdf" download className="rm-btn-download">
              <Download size={16} />
              Download Resume (PDF)
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
