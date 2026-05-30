import { useEffect, useState } from 'react';
import useIntersection from '../hooks/useIntersection';
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

function SkillBar({ name, percentage, animate }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(percentage), 200);
      return () => clearTimeout(t);
    }
  }, [animate, percentage]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5, color: '#333' }}>
          {name}
        </span>
        <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>{percentage}%</span>
      </div>
      <div style={{ height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: 'var(--primary)',
          borderRadius: 4,
          transition: 'width 1.2s ease',
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);
  const [ref, visible] = useIntersection(0.2);

  useEffect(() => {
    api.get('/skills').then(({ data }) => { if (data.length) setSkills(data); }).catch(() => {});
  }, []);

  const left = skills.filter((_, i) => i % 2 === 0);
  const right = skills.filter((_, i) => i % 2 !== 0);

  return (
    <section id="skills" style={{ background: 'var(--bg-light)', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">Skills</h2>
        <div className="section-title-underline" />
        <p style={{ color: '#666', marginBottom: 48, maxWidth: 800, lineHeight: 1.8, fontSize: '0.95rem' }}>
          My technical expertise is a blend of frontend development, software engineering, and AI/ML technologies,
          allowing me to build comprehensive, modern applications from the ground up.
        </p>
      </div>

      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px' }}>
        <div data-aos="fade-right">
          {left.map((s) => <SkillBar key={s._id} {...s} animate={visible} />)}
        </div>
        <div data-aos="fade-left">
          {right.map((s) => <SkillBar key={s._id} {...s} animate={visible} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #skills > div:last-child { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}
