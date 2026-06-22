import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProjectModal from './ProjectModal';

const fallbackProjects = [
  {
    _id: '1', title: 'Recruitment Management System', category: 'Full Stack',
    description: 'Full-stack recruitment platform enabling job applications, resume uploads, and application tracking. HR side manages postings, applicants, and interviews.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
    github: 'https://github.com/Haseebzahid9', live: '#', image: '',
  },
  {
    _id: '2', title: 'Banking Management System', category: 'Database',
    description: 'Banking system with MySQL for accounts, transactions, and loans. Features stored procedures, triggers, and a simple admin panel.',
    technologies: ['MySQL', 'HTML', 'CSS', 'JavaScript', 'Stored Procedures'],
    github: 'https://github.com/Haseebzahid9', live: '#', image: '',
  },
  {
    _id: '3', title: 'Social Media Platform (C++ DSA)', category: 'DSA',
    description: 'C++ system combining hash tables, graphs, linked lists, stacks, queues, and AVL trees for user management, friendships, posts, and messaging.',
    technologies: ['C++', 'Hash Tables', 'Graphs', 'AVL Trees', 'Linked Lists'],
    github: 'https://github.com/Haseebzahid9', live: '#', image: '',
  },
  {
    _id: '4', title: 'AI Movie Recommendation System', category: 'AI/ML',
    description: 'Movie recommendation system using K-means clustering and ANN to generate ranked suggestions from user preferences, with CSP filtering and Streamlit UI.',
    technologies: ['Python', 'K-means', 'ANN', 'Streamlit', 'Scikit-learn'],
    github: 'https://github.com/Haseebzahid9', live: '#', image: '',
  },
  {
    _id: '5', title: 'PhantomTrace — Hand Tracking AR', category: 'AI/ML',
    description: 'Browser-based AR app using MediaPipe Hands for real-time hand tracking and gesture interaction. Features air drawing, gesture recognition, dynamic visuals.',
    technologies: ['JavaScript', 'MediaPipe', 'HTML5 Canvas', 'Web Audio API'],
    github: 'https://github.com/Haseebzahid9', live: '#', image: '',
  },
];

const categories = [
  'ALL', 'Full Stack', 'Frontend', 'Backend', 'AI/ML', 'DSA', 'Mobile', 'Database',
  'C', 'C++', 'C#', 'Python', 'Java', 'JavaScript',
  'DBMS', 'OOP', 'OS', 'Networking', 'Compiler', 'Assembly',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'Cloud', 'DevOps', 'Cybersecurity', 'Blockchain',
];

const placeholderColors = {
  'Full Stack': '#0dcaf0', 'Frontend': '#6f42c1', 'Backend': '#fd7e14',
  'AI/ML': '#20c997', 'DSA': '#dc3545', 'Database': '#0d6efd', 'Mobile': '#ffc107',
};

export default function Portfolio() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/projects').then(({ data }) => { if (data.length) setProjects(data); }).catch(() => {});
  }, []);

  const [showAll, setShowAll] = useState(false);
  const LIMIT = 9;
  const filtered = filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, LIMIT);

  return (
    <section id="portfolio" style={{ background: '#fff', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">Portfolio</h2>
        <div className="section-title-underline" />
      </div>

      {/* Filter buttons */}
      <div data-aos="fade-up" data-aos-delay="100" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
        {categories.filter((c) => c === 'ALL' || projects.some((p) => p.category === c)).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '7px 20px', borderRadius: 4, cursor: 'pointer',
              fontFamily: 'Poppins', fontWeight: 500, fontSize: '0.82rem',
              transition: 'all 0.3s',
              background: filter === cat ? 'var(--primary)' : 'transparent',
              color: filter === cat ? '#fff' : '#555',
              border: `2px solid ${filter === cat ? 'var(--primary)' : '#ddd'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {visible.map((project, i) => (
          <div
            key={project._id}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            onClick={() => setSelected(project)}
            style={{
              borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
              boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
              background: '#f8f9fa',
              border: '1.5px solid #e4e4e4',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,202,240,0.2)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#e4e4e4';
            }}
          >
            {/* Image area */}
            <div style={{ position: 'relative', height: 130, overflow: 'hidden' }}>
              {project.image ? (
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  height: '100%', background: placeholderColors[project.category] || '#0dcaf0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}>
                  <i className="fas fa-code" style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.85)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.78rem' }}>{project.category}</span>
                </div>
              )}
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(13,202,240,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
                opacity: 0, transition: 'opacity 0.3s',
              }}
                className="project-overlay"
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
              >
                <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                  style={{ color: '#fff', fontSize: '1.3rem' }}>
                  <i className="fab fa-github" />
                </a>
                {project.live && project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                    style={{ color: '#fff', fontSize: '1.3rem' }}>
                    <i className="fas fa-external-link-alt" />
                  </a>
                )}
              </div>
            </div>

            <div style={{ padding: '12px 14px 14px' }}>
              <span style={{
                background: `${placeholderColors[project.category] || 'var(--primary)'}22`,
                color: placeholderColors[project.category] || 'var(--primary)',
                padding: '2px 10px', borderRadius: 12, fontSize: '0.68rem', fontWeight: 600,
              }}>
                {project.category}
              </span>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.88rem', margin: '6px 0 4px', color: '#222', lineHeight: 1.35 }}>
                {project.title}
              </h3>
              <p style={{ color: '#777', fontSize: '0.78rem', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length > LIMIT && (
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button onClick={() => setShowAll(v => !v)} className="btn-outline">
            {showAll ? <><i className="fas fa-chevron-up" /> Show Less</> : <><i className="fas fa-chevron-down" /> Show More ({filtered.length - LIMIT} more)</>}
          </button>
        </div>
      )}

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <style>{`
        .project-overlay { pointer-events: none; }
        @media (max-width: 900px) {
          #portfolio > div:last-of-type { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          #portfolio > div:last-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
