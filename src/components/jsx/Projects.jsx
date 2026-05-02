import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import RevealSection from './RevealSection';
import ProjectModal from './ProjectModal';
import '../styles/Projects.css';

/* ─── Project data (expanded for modal) ───────────────── */
const PROJECTS = [
  {
    title: 'Order Delivering Cafe Robot',
    desc: 'A cafe robot, that autonomously deliviers the food from kitchen to the customer table.',
    longDesc: 'A robot that can deliver food from the kitchen to the customer table. It is equipped with sensors to detect obstacles and navigate autonomously around a custom-made cafe floor plan to deliver food according to order and table number.',
    features: [
      'Detects obstacles and navigates autonomously',
      'LiDAR sensor for point-cloud formation for obstacle detection.',
      'Publisher-Subscriber methodology to transfer data.',
      'Uses SLAM for localization and mapping.',
    ],
    tags: ['ROS2 Humble', 'Python', 'SLAM'],
    color: '#7f5af0',
    featured: true,
    github: 'https://github.com/ProEvolution03/cafe_robot.git',
    demo: './demos/Cafe Robot demo.mp4',
  },
  {
    title: 'DWA Local Path Planner',
    desc: 'Dynamic Window Approach (DWA) based local planner for TurtleBot3 in ROS2.',
    longDesc: 'This project implements a custom Dynamic Window Approach (DWA) local planner for a TurtleBot3 robot using ROS2 and Gazebo. Unlike the default nav2_dwb_controller, this planner computes velocity commands by evaluating possible trajectories in real-time while considering obstacle avoidance using LiDAR data. The system demonstrates autonomous navigation in a simulated environment with efficient local path planning.',
    features: [
      'Custom implementation of Dynamic Window Approach (DWA)',
      'Real-time obstacle avoidance using LiDAR sensor data',
      'ROS2-based architecture with TurtleBot3 integration',
      'Simulation in Gazebo environment',
      'Trajectory evaluation and velocity sampling',
    ],
    tags: ['ROS2', 'C++', 'Gazebo', 'TurtleBot3', 'Robotics'],
    color: '#2cb67d',
    github: 'https://github.com/ProEvolution03/dwa-local-path-planner',
    demo: './demos/DWAplanner.png',
  },
  {
    title: 'Neural Navigator',
    desc: 'Neuroevolution-based navigation system using neural networks and genetic algorithms.',
    longDesc: 'This project explores autonomous navigation using neuroevolution techniques, where neural networks are evolved using genetic algorithms instead of traditional training methods like backpropagation. The system learns navigation strategies through iterative evolution, optimizing agent behavior in dynamic environments. It demonstrates how AI agents can adapt and improve decision-making over generations without explicit supervision.',
    features: [
      'Neuroevolution approach for training neural networks',
      'Genetic algorithms for optimization (selection, crossover, mutation)',
      'Autonomous navigation in dynamic environments',
      'Fitness-based evaluation of agent performance',
      'Simulation of learning across generations',
    ],
    tags: ['Python', 'Machine Learning', 'Neuroevolution', 'Genetic Algorithm', 'AI'],
    color: '#ff6b6b',
    github: 'https://github.com/ProEvolution03/neural-navigator.git',
    demo: '#',
  },
  {
    title: 'Apple Robot - BehaviourTree.CPP Demo',
    desc: 'BehaviorTree.CPP-based robot task execution system for structured decision-making.',
    longDesc: 'AppleRobot is a C++ project demonstrating task planning and execution using the BehaviorTree.CPP library. The system models a robot performing a real-world inspired task—navigating to a room, interacting with doors, locating an apple, and completing a retrieval sequence. The behavior is structured using a hierarchical Behavior Tree with Sequences and Fallback nodes, showcasing modular decision-making, condition checking, and action execution. The project highlights how Behavior Trees can be used as an alternative to finite state machines for scalable and maintainable robotic control.',
    features: [
      'Custom Behavior Tree implementation using BehaviorTree.CPP',
      'Hierarchical task execution with Sequence and Fallback nodes',
      'Custom Action and Condition node design in C++',
      'Modular and extensible decision-making architecture',
      'Demonstrates real-world robotic workflow (navigation + manipulation logic)',
      'Supports both programmatic and XML-based tree definitions',
    ],
    tags: ['C++', 'Behavior Trees', 'BehaviorTree.CPP'],
    color: '#f0ad4e',
    github: 'https://github.com/ProEvolution03/AppleRobot.git',
    demo: './demos/BehaviorTreeCPP.png',
  },
];

/* ─── Framer Motion variants ──────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

/* ─── Component ───────────────────────────────────────── */
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState(null);

  return (
    <>
      <RevealSection id="projects" className="projects section" ref={ref}>
        <div className="container">
          {/* Header */}
          <motion.div
            className="projects__header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Projects</span>
            <h2 className="section-title">Things I've built</h2>
            <p className="projects__sub">
              Click any card to explore the project in detail.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="projects__grid"
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {PROJECTS.map((project) => {
              const { title, desc, tags, color, featured } = project;
              return (
                <motion.div
                  key={title}
                  className={`project-card glass-card ${featured ? 'project-card--featured' : ''}`}
                  variants={card}
                  whileHover={{ y: -6, scale: 1.018 }}
                  whileTap={{ scale: 0.975 }}
                  style={{ '--card-accent': color, cursor: 'pointer' }}
                  onClick={() => setSelected(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${title} details`}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(project)}
                >
                  {/* Coloured top accent bar */}
                  <div className="project-card__accent" />

                  {/* "Click to view" hint rendered at the bottom in its own space */}


                  <div className="project-card__body">
                    {featured && <span className="project-card__badge">Featured</span>}
                    <h3 className="project-card__title">{title}</h3>
                    <p className="project-card__desc">{desc}</p>

                    <div className="project-card__tags">
                      {tags.map((t) => (
                        <span key={t} className="project-card__tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-card__action">
                    <span className="project-card__hint-text">View details</span>
                    <span className="project-card__hint-arrow">→</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </RevealSection>

      {/* Modal — rendered into <body> via portal inside ProjectModal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.title}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
