import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/TransitionFlash.css';

/**
 * TransitionFlash — listens for the custom 'nav-transition' event
 * dispatched by Navbar when a link is clicked, then renders a brief
 * radial burst from the click position.
 *
 * Inspired by Apple's "liquid expand" feel in iPadOS / visionOS.
 */
export default function TransitionFlash() {
  const [flash, setFlash] = useState(null); // { x, y, id }

  useEffect(() => {
    const handler = (e) => {
      setFlash({ x: e.detail.x, y: e.detail.y, id: Date.now() });
    };
    window.addEventListener('nav-transition', handler);
    return () => window.removeEventListener('nav-transition', handler);
  }, []);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          key={flash.id}
          className="tf-overlay"
          style={{ '--tx': `${flash.x}px`, '--ty': `${flash.y}px` }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 3.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={() => setFlash(null)}
        />
      )}
    </AnimatePresence>
  );
}
