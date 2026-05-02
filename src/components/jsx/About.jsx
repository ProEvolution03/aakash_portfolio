import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import RevealSection from './RevealSection';
import '../styles/About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

const CHIPS = [
  'ROS2 Humble', 'Ubuntu', 'Python', 'C/C++', 'React.js',
  'Node.js', 'Java', 'OpenCV', 'Machine Learning',
];

const TIMELINE = [
  {
    icon: Briefcase,
    period: '2026 – Present',
    title: 'Automation Engineer',
    org: 'CareYu Automation Pvt. Ltd.',
    desc: 'Working as Automation Engineer, planning on maximising efficient warehouse storage solutions.',
  },
  {
    icon: Briefcase,
    period: '2025',
    title: 'Mechatronics Engineer — Intern',
    org: 'Nirbhav Automation Pvt. Ltd.',
    desc: 'Worked on automation solutions for clean and safe packaging of hazardous chemicals, along with inspection systems for defect detection and dimension measuring.',
  },
  {
    icon: GraduationCap,
    period: '2021 – 2025',
    title: 'B.Tech. Mechatronics',
    org: 'SASTRA University',
    desc: 'Graduated in 2025, with expertise and knowledge in robotics, automation, and control systems.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <RevealSection id="about" className="about section section--alt" ref={ref}>
      <div className="container about__grid">

        {/* Left: bio — 65% */}
        <motion.div
          className="about__bio"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Turning dreams<br />into experiences
          </h2>

          <p className="about__text">
            I'm Aakash Sivakumar, a Robotics and Automation Engineer, working @Care Yu Automation.
            I live at the intersection of finding and designing automation solutions for warehousing
            clients, aiming at efficiently maximising storage density and throughput of their warehouses.
          </p>
          <p className="about__text">
            When my mind is taking a rest, you can find me with a cup of coffee,
            watching and analyzing the Game of Cricket.
          </p>

          {/* Skill chips */}
          <div className="about__chips">
            {CHIPS.map((c, i) => (
              <motion.span
                key={c}
                className="about__chip"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.055 }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right: journal timeline — 35% */}
        <motion.div
          className="about__timeline"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.12 }}
        >
          {TIMELINE.map(({ icon: Icon, period, title, org, desc }, i) => (
            <motion.div
              key={title}
              className="timeline-item"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.12 }}
            >
              <div className="timeline-item__icon">
                <Icon size={14} />
              </div>
              <div className="timeline-item__body">
                <span className="timeline-item__period">{period}</span>
                <h3 className="timeline-item__title">{title}</h3>
                <span className="timeline-item__org">{org}</span>
                <p className="timeline-item__desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </RevealSection>
  );
}
