import { useEffect, useState } from 'react';
import api from '../utils/api';

const fallbackSkills = [
  { _id: '1', name: 'JavaScript', percentage: 85, category: 'Languages' },
  { _id: '2', name: 'React.js', percentage: 90, category: 'Frontend' },
  { _id: '3', name: 'HTML / CSS', percentage: 90, category: 'Frontend' },
  { _id: '4', name: 'Tailwind CSS', percentage: 85, category: 'Frontend' },
  { _id: '5', name: 'Python', percentage: 75, category: 'Languages' },
  { _id: '6', name: 'C++', percentage: 70, category: 'Languages' },
  { _id: '7', name: 'Node.js / Express', percentage: 70, category: 'Backend' },
  { _id: '8', name: 'SQL / MongoDB', percentage: 75, category: 'Backend' },
  { _id: '9', name: 'React Native', percentage: 65, category: 'Frontend' },
  { _id: '10', name: 'LangChain / RAG', percentage: 60, category: 'AI/ML' },
  { _id: '11', name: 'Git / GitHub', percentage: 85, category: 'Tools' },
  { _id: '12', name: 'Figma', percentage: 70, category: 'Tools' },
];

/* Inline SVG icons — no new packages needed */
const TechIcons = {
  MongoDB: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2C16 2 10 10.5 10 17.5C10 21.09 12.69 24 16 24C19.31 24 22 21.09 22 17.5C22 10.5 16 2 16 2Z" fill="#47A248"/>
      <path d="M16 24V30" stroke="#47A248" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 24C16 24 13 21 13 17.5" stroke="#2d6a2d" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Express: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 56 32" fill="none">
      <text x="2" y="26" fontFamily="Georgia, serif" fontStyle="italic" fontSize="28" fontWeight="400" fill="#D4A017">ex</text>
    </svg>
  ),
  React: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(0 16 16)"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(120 16 16)"/>
      <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
    </svg>
  ),
  NodeJs: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="#3d7a1f" stroke="#83CD29" strokeWidth="1.2"/>
      <text x="8.5" y="21" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="10" fill="#83CD29">JS</text>
    </svg>
  ),
  JavaScript: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <text x="7" y="24" fontFamily="Arial" fontWeight="900" fontSize="13" fill="#333">JS</text>
    </svg>
  ),
  Python: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3C10 3 8 6 8 9V13H16V14H5C3 14 1 15.5 1 19C1 22.5 3 25 5 25H8V21C8 19 9.5 18 11 18H21C23 18 24 16.5 24 15V9C24 6 22 3 16 3Z" fill="#3572A5"/>
      <path d="M16 29C22 29 24 26 24 23V19H16V18H27C29 18 31 16.5 31 13C31 9.5 29 7 27 7H24V11C24 13 22.5 14 21 14H11C9 14 8 15.5 8 17V23C8 26 10 29 16 29Z" fill="#FFD43B"/>
      <circle cx="12" cy="8" r="1.5" fill="#fff"/>
      <circle cx="20" cy="24" r="1.5" fill="#3572A5"/>
    </svg>
  ),
  Cpp: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#00599C"/>
      <text x="4" y="22" fontFamily="Arial" fontWeight="900" fontSize="12" fill="#fff">C++</text>
    </svg>
  ),
  Git: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#F05032"/>
      <text x="5" y="22" fontFamily="Arial" fontWeight="900" fontSize="11" fill="#fff">git</text>
    </svg>
  ),
  Figma: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="8" y="2" width="8" height="10" rx="4" fill="#F24E1E"/>
      <rect x="16" y="2" width="8" height="10" rx="4" fill="#FF7262"/>
      <rect x="8" y="12" width="8" height="10" rx="4" fill="#A259FF"/>
      <rect x="8" y="22" width="8" height="10" rx="4" fill="#0ACF83"/>
      <circle cx="20" cy="17" r="4" fill="#1ABCFE"/>
    </svg>
  ),
  SQL: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#336791"/>
      <text x="4" y="22" fontFamily="Arial" fontWeight="900" fontSize="10" fill="#fff">SQL</text>
    </svg>
  ),
  Tailwind: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#06B6D4"/>
      <path d="M8 18c1-4 4-6 8-5-1 4-4 6-8 5zm8-5c1-4 4-6 8-5-1 4-4 6-8 5z" fill="#fff"/>
    </svg>
  ),
  LangChain: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#1a1a2e"/>
      <text x="4" y="22" fontFamily="Arial" fontWeight="900" fontSize="9" fill="#0dcaf0">RAG</text>
    </svg>
  ),
};

function getIcon(skillName, size) {
  const n = skillName.toLowerCase();
  if (n.includes('mongo')) return <TechIcons.MongoDB size={size} />;
  if (n.includes('express')) return <TechIcons.Express size={size} />;
  if (n.includes('react native')) return <TechIcons.React size={size} />;
  if (n.includes('react')) return <TechIcons.React size={size} />;
  if (n.includes('node')) return <TechIcons.NodeJs size={size} />;
  if (n.includes('javascript') || n === 'js') return <TechIcons.JavaScript size={size} />;
  if (n.includes('python')) return <TechIcons.Python size={size} />;
  if (n.includes('c++') || n.includes('cpp')) return <TechIcons.Cpp size={size} />;
  if (n.includes('git')) return <TechIcons.Git size={size} />;
  if (n.includes('figma')) return <TechIcons.Figma size={size} />;
  if (n.includes('sql')) return <TechIcons.SQL size={size} />;
  if (n.includes('tailwind')) return <TechIcons.Tailwind size={size} />;
  if (n.includes('langchain') || n.includes('rag')) return <TechIcons.LangChain size={size} />;
  if (n.includes('html') || n.includes('css')) return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#E44D26"/>
      <text x="4" y="22" fontFamily="Arial" fontWeight="900" fontSize="9" fill="#fff">HTML5</text>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#0dcaf0"/>
      <text x="4" y="22" fontFamily="Arial" fontWeight="900" fontSize="10" fill="#fff">{skillName.substring(0,3).toUpperCase()}</text>
    </svg>
  );
}

function getColor(skillName) {
  const n = skillName.toLowerCase();
  if (n.includes('mongo')) return '#47A248';
  if (n.includes('express')) return '#D4A017';
  if (n.includes('react')) return '#61DAFB';
  if (n.includes('node')) return '#83CD29';
  if (n.includes('javascript')) return '#c9a800';
  if (n.includes('python')) return '#3572A5';
  if (n.includes('c++')) return '#00599C';
  if (n.includes('git')) return '#F05032';
  if (n.includes('figma')) return '#F24E1E';
  if (n.includes('sql') || n.includes('mongo')) return '#336791';
  if (n.includes('tailwind')) return '#06B6D4';
  if (n.includes('langchain') || n.includes('rag')) return '#0dcaf0';
  if (n.includes('html') || n.includes('css')) return '#E44D26';
  return '#1a3c34';
}

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);
  const color = getColor(skill.name);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff' : '#fafafa',
        border: `1.5px solid ${hovered ? color : '#e8e8e8'}`,
        borderRadius: 14,
        padding: '28px 16px 22px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        cursor: 'default',
        transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 14px 36px ${color}28` : '0 2px 10px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(.34,1.3,.64,1)',
      }}
    >
      <div style={{
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(.34,1.5,.64,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 60,
      }}>
        {getIcon(skill.name, 52)}
      </div>
      <span style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.82rem',
        color: hovered ? color : '#444',
        textAlign: 'center', letterSpacing: 0.2,
        transition: 'color 0.25s',
      }}>
        {skill.name}
      </span>
    </div>
  );
}

/* MERN spotlight row — always shown at the top */
const mernSkills = [
  { _id: 'mern-1', name: 'MongoDB', percentage: 75, category: 'Backend' },
  { _id: 'mern-2', name: 'Express.js', percentage: 70, category: 'Backend' },
  { _id: 'mern-3', name: 'React.js', percentage: 90, category: 'Frontend' },
  { _id: 'mern-4', name: 'Node.js', percentage: 70, category: 'Backend' },
];

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    api.get('/skills').then(({ data }) => { if (data.length) setSkills(data); }).catch(() => {});
  }, []);

  return (
    <section id="skills" style={{ background: 'var(--bg-light)', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">Skills</h2>
        <div className="section-title-underline" />
        <p style={{ color: '#666', marginBottom: 48, maxWidth: 800, lineHeight: 1.8, fontSize: '0.95rem' }}>
          My technical expertise spans frontend development, full-stack engineering, and AI/ML —
          enabling me to build modern, end-to-end applications.
        </p>
      </div>

      {/* MERN Stack spotlight */}
      <div data-aos="fade-up" data-aos-delay="60" style={{ marginBottom: 12 }}>
        <h3 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem',
          color: '#1a3c34', letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          MERN Stack
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
          marginBottom: 52,
        }}
          className="mern-grid"
        >
          {mernSkills.map((s) => <SkillCard key={s._id} skill={s} />)}
        </div>
      </div>

      {/* All skills */}
      <div data-aos="fade-up" data-aos-delay="120">
        <h3 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem',
          color: '#1a3c34', letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          All Technologies
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: 18,
        }}>
          {skills.map((s) => <SkillCard key={s._id} skill={s} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mern-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #skills { padding: 60px 20px !important; }
          .mern-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
