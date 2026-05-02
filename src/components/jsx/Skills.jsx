import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealSection from './RevealSection';
import '../styles/Skills.css';

const SKILL_GROUPS = [
  {
    label: 'Robotics & Control',
    skills: ['ROS2 Humble', 'Kinematics & Dynamics', 'Path Planning', 'Motor Control', 'Industrial Automation', 'Manipulator Design'],
  },
  {
    label: 'Software & Languages',
    skills: ['Python', 'C/C++', 'Java', 'React.js', 'Node.js', 'Ubuntu / Linux'],
  },
  {
    label: 'Vision & AI',
    skills: ['OpenCV', 'Machine Learning', 'Data Processing', 'Camera Calibration'],
  },
];

const TOOLS = [
  'AutoCAD', 'Git', 'Figma', 'Arduino', 'BehaviorTree.CPP', 'Raspberry Pi', 'Gazebo', 'Sensors', 'APIs'
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <RevealSection id="skills" className="skills section section--alt" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">What I work with</h2>
        </motion.div>

        {/* Typeset skill groups */}
        <div className="skills__groups">
          {SKILL_GROUPS.map(({ label, skills }, gi) => (
            <motion.div
              key={label}
              className="skill-group"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.12, duration: 0.55 }}
            >
              <h3 className="skill-group__label">{label}</h3>
              <div className="skill-group__grid">
                {skills.map((name, i) => (
                  <motion.div
                    key={name}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.12 + i * 0.05 + 0.18 }}
                  >
                    {name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools — Bill of Materials */}
        <motion.div
          className="skills__tools-section"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
        >
          <p className="skills__tools-label">Tools & Platforms</p>
          <div className="skills__tools">
            {TOOLS.map((t, i) => (
              <motion.span
                key={t}
                className="skill-tool"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.65 + i * 0.04 }}
                whileHover={{ scale: 1.06 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </RevealSection>
  );
}
