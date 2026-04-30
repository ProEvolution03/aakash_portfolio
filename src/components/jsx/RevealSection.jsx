import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';

/**
 * Direction-aware section pop-in.
 *
 * Framer Motion's `custom` prop feeds the current scroll direction into
 * the variant functions so the section always enters from the right side:
 *   • Scrolling DOWN  → section pops in from BELOW  (y: +72 → 0)
 *   • Scrolling UP    → section pops in from ABOVE   (y: -72 → 0)
 *
 * `once: false` means the animation re-fires every time the section
 * re-enters the viewport, in whichever direction the user is scrolling.
 */

const popVariants = {
  /** Called each time the animation starts — receives the latest `custom` value */
  hidden: (dir) => ({
    opacity: 0,
    y:     dir === 'up' ? -72 : 72,
    scale: 0.93,
  }),
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
  },
};

const springTransition = {
  type:      'spring',
  stiffness: 210,
  damping:   22,
  mass:      0.9,
};

const RevealSection = forwardRef(function RevealSection(
  { id, className, style, children },
  externalRef,
) {
  const direction = useScrollDirection();

  return (
    <motion.section
      ref={externalRef}
      id={id}
      className={className}
      style={style}
      /* Pass direction into variant functions every render */
      custom={direction}
      variants={popVariants}
      initial="hidden"
      whileInView="visible"
      /* once:false → re-fires on every viewport entry (up or down) */
      viewport={{ once: false, margin: '-80px' }}
      transition={springTransition}
    >
      {children}
    </motion.section>
  );
});

export default RevealSection;
