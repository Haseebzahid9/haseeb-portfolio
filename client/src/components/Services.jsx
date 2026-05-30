import { useEffect, useState } from 'react';
import api from '../utils/api';

const iconMap = {
  monitor: 'fas fa-desktop',
  layers: 'fas fa-layer-group',
  smartphone: 'fas fa-mobile-alt',
  cpu: 'fas fa-brain',
  database: 'fas fa-database',
  code: 'fas fa-code',
};

const fallbackServices = [
  { _id: '1', title: 'Frontend Development', description: 'Build modern, responsive UIs with React.js, Tailwind CSS, and component-based architecture optimized for performance and UX.', icon: 'monitor', tags: ['React.js', 'Tailwind CSS', 'JavaScript'], order: 1 },
  { _id: '2', title: 'Full Stack Web Apps', description: 'End-to-end MERN stack applications: React frontend, Node/Express backend, MongoDB database, with REST API integration.', icon: 'layers', tags: ['MongoDB', 'Express.js', 'Node.js'], order: 2 },
  { _id: '3', title: 'React Native Mobile Apps', description: 'Cross-platform mobile applications using React Native with clean UI, smooth navigation, and native performance.', icon: 'smartphone', tags: ['React Native', 'Mobile', 'Cross-Platform'], order: 3 },
  { _id: '4', title: 'AI/ML Integration', description: 'Integrate RAG pipelines, LangChain, recommendation systems, and LLM-powered features into web applications.', icon: 'cpu', tags: ['LangChain', 'RAG', 'Python'], order: 4 },
  { _id: '5', title: 'Database Design', description: 'SQL (MySQL) and NoSQL (MongoDB) database design with optimized schemas, stored procedures, and queries.', icon: 'database', tags: ['MySQL', 'MongoDB', 'PostgreSQL'], order: 5 },
  { _id: '6', title: 'API Development', description: 'RESTful API development with Node.js/Express, JWT authentication, and integration with third-party services.', icon: 'code', tags: ['REST API', 'JWT', 'Node.js'], order: 6 },
];

const SERV_LIMIT = 9;

export default function Services() {
  const [services, setServices] = useState(fallbackServices);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api.get('/services').then(({ data }) => { if (data.length) setServices(data); }).catch(() => {});
  }, []);

  const visible = showAll ? services : services.slice(0, SERV_LIMIT);

  return (
    <section id="services" style={{ background: '#fff', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">Services</h2>
        <div className="section-title-underline" />
        <p style={{ color: '#666', marginBottom: 48, maxWidth: 800, lineHeight: 1.8, fontSize: '0.95rem' }}>
          I offer end-to-end frontend and full-stack development solutions, from modern React UIs to
          AI/ML integration and database design. Below are the key services I provide.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {visible.map((svc, i) => (
          <div
            key={svc._id}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            style={{
              display: 'flex', flexDirection: 'column', gap: 0,
              padding: '28px 24px', borderRadius: 10, transition: 'all 0.3s',
              border: '1px solid #f0f0f0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,202,240,0.15)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#f0f0f0';
            }}
          >
            {/* Icon */}
            <div style={{
              width: 52, height: 52, borderRadius: 10,
              background: 'rgba(13,202,240,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}>
              <i className={iconMap[svc.icon] || 'fas fa-code'} style={{ color: 'var(--primary)', fontSize: '1.3rem' }} />
            </div>

            {/* Title */}
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: 10, color: '#1a1a2e' }}>
              {svc.title}
            </h3>

            {/* Description */}
            <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
              {svc.description}
            </p>

            {/* Tags */}
            {svc.tags && svc.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                {svc.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '3px 12px',
                    border: '1px solid var(--primary)',
                    borderRadius: 20,
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    fontFamily: 'Poppins',
                    background: 'rgba(13,202,240,0.05)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {services.length > SERV_LIMIT && (
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button onClick={() => setShowAll(v => !v)} className="btn-outline">
            {showAll ? <><i className="fas fa-chevron-up" /> Show Less</> : <><i className="fas fa-chevron-down" /> Show More ({services.length - SERV_LIMIT} more)</>}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          #services > div:nth-child(3) { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          #services > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
