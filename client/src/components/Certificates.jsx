import { useEffect, useState } from 'react';
import api from '../utils/api';

const fallback = [
  { _id: '1', title: 'SkillUP in Excel 2019', issuer: 'EDUCBA', date: '2023', category: 'Other', description: 'Comprehensive Excel 2019 training covering formulas, pivot tables, data analysis and automation.', skills: ['Excel', 'Data Analysis', 'Pivot Tables'], image: '', credentialUrl: '' },
  { _id: '2', title: 'Responsive Website Development (HTML, CSS, JS)', issuer: 'EDUCBA', date: '2023', category: 'Web Development', description: 'HTML, CSS, and JavaScript fundamentals for building responsive, modern websites.', skills: ['HTML', 'CSS', 'JavaScript'], image: '', credentialUrl: '' },
  { _id: '3', title: 'Technical SEO Course', issuer: 'Semrush', date: '2024', category: 'Other', description: 'Advanced technical SEO strategies including site architecture, crawlability, and performance optimization.', skills: ['SEO', 'Site Architecture', 'Performance'], image: '', credentialUrl: '' },
  { _id: '4', title: 'Certificate of Appreciation – Webinar Hosting', issuer: 'UWorx Group', date: '2024', category: 'Other', description: 'Awarded for successfully hosting and managing a professional webinar event.', skills: ['Communication', 'Event Management'], image: '', credentialUrl: '' },
];

function CertModal({ cert, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'cfadeIn 0.2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, maxWidth: 560, width: '100%', overflow: 'hidden', animation: 'cslideUp 0.25s ease', boxShadow: '0 24px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Dark header */}
        <div style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)', padding: '26px 28px 22px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(13,202,240,0.15)', border: '2px solid rgba(13,202,240,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <i className="fas fa-award" style={{ color: 'var(--primary)', fontSize: '1.4rem' }} />
          </div>

          <h2 style={{ color: '#fff', fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.15rem', marginBottom: 8, lineHeight: 1.35, paddingRight: 40 }}>
            {cert.title}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <i className="fas fa-building" style={{ color: 'rgba(13,202,240,0.7)', fontSize: '0.8rem' }} />
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>{cert.issuer}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <i className="fas fa-calendar-alt" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{cert.date}</span>
            </div>
            {cert.category && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <i className="fas fa-tag" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }} />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{cert.category}</span>
              </div>
            )}
          </div>
        </div>

        {/* Certificate image */}
        {cert.image && (
          <div style={{ padding: '20px 28px 0' }}>
            <img src={cert.image} alt={cert.title} style={{ width: '100%', borderRadius: 8, border: '1px solid #eee', maxHeight: 280, objectFit: 'contain', background: '#f8f9fa' }} />
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '22px 28px 28px' }}>

          {/* Description */}
          {cert.description && (
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#333', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>About</h4>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.8 }}>{cert.description}</p>
            </div>
          )}

          {/* Skills */}
          {cert.skills && cert.skills.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#333', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cert.skills.map(s => (
                  <span key={s} style={{ padding: '4px 14px', border: '1px solid var(--primary)', borderRadius: 20, color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 600, background: 'rgba(13,202,240,0.06)' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                <i className="fas fa-external-link-alt" /> View Credential
              </a>
            )}
            <button onClick={onClose} className="btn-outline">Close</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cfadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes cslideUp { from { transform:translateY(28px);opacity:0 } to { transform:translateY(0);opacity:1 } }
      `}</style>
    </div>
  );
}

const CERT_LIMIT = 8;

export default function Certificates() {
  const [certs, setCerts] = useState(fallback);
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api.get('/certificates').then(({ data }) => { if (data.length) setCerts(data); }).catch(() => {});
  }, []);

  const visible = showAll ? certs : certs.slice(0, CERT_LIMIT);

  return (
    <section id="certificates" style={{ background: 'var(--bg-light)', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">Certifications</h2>
        <div className="section-title-underline" />
        <p style={{ color: '#666', marginBottom: 40, maxWidth: 700, lineHeight: 1.8, fontSize: '0.95rem' }}>
          Professional certifications and achievements. Click any card to view full details.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {visible.map((cert, i) => (
          <div
            key={cert._id}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            onClick={() => setSelected(cert)}
            style={{
              background: '#fff', borderRadius: 10, padding: '18px 22px',
              border: '1px solid #e8e8e8', borderLeft: '4px solid var(--primary)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16,
              transition: 'all 0.3s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,202,240,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
          >
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(13,202,240,0.1)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-award" style={{ color: 'var(--primary)', fontSize: '1.1rem' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.92rem', color: '#1a1a2e', marginBottom: 3, lineHeight: 1.35 }}>{cert.title}</h3>
              <p style={{ color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600 }}>{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>

      {certs.length > CERT_LIMIT && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button onClick={() => setShowAll(v => !v)} className="btn-outline">
            {showAll ? <><i className="fas fa-chevron-up" /> Show Less</> : <><i className="fas fa-chevron-down" /> Show More ({certs.length - CERT_LIMIT} more)</>}
          </button>
        </div>
      )}

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @media (max-width: 700px) {
          #certificates > div:last-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
