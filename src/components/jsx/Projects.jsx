import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, Star } from 'lucide-react';
import RevealSection from './RevealSection';
import ProjectModal  from './ProjectModal';
import '../styles/Projects.css';

/* ─── Project data (expanded for modal) ───────────────── */
const PROJECTS = [
  {
    title:    'NebulaUI',
    desc:     'A next-gen design system for React with 80+ accessible components, dark-mode first, and zero runtime CSS-in-JS.',
    longDesc: 'NebulaUI is a production-ready component library built for teams who care about both performance and aesthetics. Every component ships with full WAI-ARIA compliance, keyboard navigation, and an opt-in dark theme — all without a single byte of runtime style injection.',
    features: [
      '80+ fully accessible, WAI-ARIA compliant components',
      'Zero runtime CSS-in-JS — static extraction at build time',
      'Automatic dark / light mode via a single CSS custom property toggle',
      'First-class Storybook integration with interactive docs',
      'Tree-shakeable — import only what you use',
    ],
    tags:     ['React', 'TypeScript', 'Storybook'],
    stars:    '2.4k',
    color:    '#7f5af0',
    featured: true,
    github:   '#',
    demo:     '#',
  },
  {
    title:    'FlowBoard',
    desc:     'Real-time collaborative Kanban tool built with WebSockets, supporting 50+ concurrent users per board.',
    longDesc: 'FlowBoard brings the speed of a native desktop app to collaborative project management. Powered by Socket.IO with CRDT-based conflict resolution, edits from up to 50 concurrent users merge seamlessly — no refresh required.',
    features: [
      'CRDT-based real-time sync — zero conflicts on simultaneous edits',
      'Drag-and-drop cards with live cursor presence indicators',
      'File attachments via S3 with inline image previews',
      'Webhook integrations for GitHub, Slack, and Jira',
      'Full audit log and undo history (30-day retention)',
    ],
    tags:     ['Next.js', 'Socket.io', 'PostgreSQL'],
    stars:    '1.1k',
    color:    '#2cb67d',
    github:   '#',
    demo:     '#',
  },
  {
    title:    'PulseMetrics',
    desc:     'Open-source analytics dashboard that visualises 10M+ events per day using D3.js and Apache Kafka.',
    longDesc: 'PulseMetrics is a self-hosted alternative to Mixpanel and Amplitude. It ingests events through a Kafka cluster, aggregates them with ClickHouse, and renders interactive D3.js charts with sub-second query latency even at 10M+ daily events.',
    features: [
      'Ingest 10M+ events/day via a Kafka-backed pipeline',
      'Sub-100 ms dashboard queries powered by ClickHouse',
      'Funnel analysis, retention cohorts, and A/B test views',
      'Custom event schemas — no predefined taxonomy required',
      'One-click Docker Compose deployment for self-hosting',
    ],
    tags:     ['Vue 3', 'D3.js', 'Kafka'],
    stars:    '867',
    color:    '#ff6b6b',
    github:   '#',
    demo:     '#',
  },
  {
    title:    'AI Commit',
    desc:     'CLI tool that generates semantic commit messages from git diffs using the OpenAI API.',
    longDesc: 'AI Commit reads your staged git diff and uses GPT-4o to produce Conventional Commits-formatted messages in under two seconds. It respects your existing commit conventions by learning from the last 20 commits in the repository.',
    features: [
      'Generates Conventional Commits messages from staged diffs',
      'Learns your repo\'s commit style from recent history',
      'Works with any OpenAI-compatible API endpoint',
      'Supports commit scope inference from changed file paths',
      'Interactive mode for reviewing and tweaking before committing',
    ],
    tags:     ['Python', 'OpenAI', 'CLI'],
    stars:    '3.9k',
    color:    '#f59e0b',
    github:   '#',
    demo:     '#',
  },
  {
    title:    'Karta Maps',
    desc:     'Offline-first mapping app for hikers with custom tile rendering and GPX track export.',
    longDesc: 'Karta Maps lets hikers download full topographic map regions for offline use, record GPS tracks, and export routes as GPX or KML. Custom MapLibre shaders render hillshading and contour lines directly on the device GPU.',
    features: [
      'Full offline tile storage with delta sync on reconnect',
      'GPU-accelerated hillshading via custom MapLibre shaders',
      'Record, replay, and share GPS tracks as GPX / KML',
      'Elevation profile graph with grade and distance markers',
      'Supports custom map styles via a JSON editor',
    ],
    tags:     ['React Native', 'MapLibre', 'SQLite'],
    stars:    '540',
    color:    '#06b6d4',
    github:   '#',
    demo:     '#',
  },
  {
    title:    'DevLink',
    desc:     'Portfolio link-in-bio generator with analytics. Used by 4 000+ developers worldwide.',
    longDesc: 'DevLink lets developers build a branded landing page in minutes — paste your links, choose a theme, and get a shareable URL. Built-in analytics show click-through rates per link, referrer breakdown, and daily unique visitors.',
    features: [
      'Live preview editor with 12 built-in themes',
      'Analy­tics dashboard: clicks, referrers, and geo insights',
      'Custom domain support with automatic HTTPS via Vercel',
      'GitHub, npm, and Product Hunt one-click integrations',
      'Export your page as a standalone HTML file',
    ],
    tags:     ['SvelteKit', 'Supabase', 'Vercel'],
    stars:    '728',
    color:    '#ec4899',
    github:   '#',
    demo:     '#',
  },
];

/* ─── Framer Motion variants ──────────────────────────── */
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};
const card = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

/* ─── Component ───────────────────────────────────────── */
export default function Projects() {
  const ref    = useRef(null);
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
              const { title, desc, tags, stars, color, featured } = project;
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
