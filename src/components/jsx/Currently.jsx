import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealSection from './RevealSection';
import '../styles/Currently.css';

/* ─── Status items — update these whenever things change ─── */
const ITEMS = [
  {
    key: 'building',
    label: 'Building',
    value: 'Warehouse Automation Systems @ Care Yu Automation',
    note: 'Maximising storage density & throughput',
  },
  {
    key: 'reading',
    label: 'Reading',
    value: 'Cricket 2.0 : Inside the T20 Revolution',
    note: 'Freddie Wilde',
  },
  {
    key: 'learning',
    label: 'Learning',
    value: 'Fullstack ROS2',
    note: 'Entire autonomous navigation stack',
  },
  {
    key: 'watching',
    label: 'Watching',
    value: 'IPL 2026',
    note: 'Khel Bindaas!',
  },
];

export default function Currently() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <RevealSection id="currently" className="currently section" ref={ref}>
      <div className="container">
        <motion.div
          className="currently__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Left label */}
          <div className="currently__label-col">
            <span className="currently__eyebrow">Status</span>
            <h2 className="currently__heading">Currently</h2>
          </div>

          {/* Right items */}
          <div className="currently__grid">
            {ITEMS.map(({ key, label, value, note }, i) => (
              <motion.div
                key={key}
                className="currently__item"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i + 0.15, duration: 0.5 }}
              >
                <span className="currently__item-label">{label}</span>
                <span className="currently__item-value">{value}</span>
                <span className="currently__item-note">{note}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </RevealSection>
  );
}
