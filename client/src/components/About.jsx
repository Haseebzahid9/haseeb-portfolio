import { useEffect, useRef, useState } from 'react';

function StatCard({ value, label, suffix, isVisible, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: 'center',
        background: '#fff',
        padding: '28px 20px',
        borderRadius: 12,
        border: `1.5px solid ${hov ? 'var(--primary)' : '#e8e8e8'}`,
        cursor: 'default',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov
          ? '0 12px 32px rgba(13,202,240,0.14)'
          : '0 2px 10px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(.34,1.2,.64,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* thin top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, borderRadius: '12px 12px 0 0',
        background: hov ? 'var(--primary)' : 'transparent',
        transition: 'background 0.3s',
      }} />

      <div style={{
        fontSize: '2.2rem', fontWeight: 800,
        color: 'var(--primary)',
        fontFamily: 'Poppins',
        lineHeight: 1,
      }}>
        <Counter target={value} suffix={suffix} isVisible={isVisible} />
      </div>
      <div style={{
        color: hov ? '#333' : '#888',
        fontSize: '0.83rem', marginTop: 10,
        fontWeight: 500, letterSpacing: 0.3,
        transition: 'color 0.3s',
      }}>
        {label}
      </div>
    </div>
  );
}

const stats = [
  { value: 5, label: 'Projects Completed', suffix: '+' },
  { value: 1, label: 'Years Experience', suffix: '+' },
  { value: 10, label: 'Technologies', suffix: '+' },
  { value: 100, label: 'Dedication', suffix: '%' },
];

function Counter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return <>{count}{suffix}</>;
}

export default function About() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: '#fff', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">About</h2>
        <div className="section-title-underline" />
      </div>

      {/* Full paragraph */}
      <p data-aos="fade-up" data-aos-delay="100" style={{
        color: '#555', lineHeight: 1.9, marginBottom: 50,
        maxWidth: 900, fontSize: '0.97rem',
      }}>
        As a Frontend Developer and CS student at FAST-NUCES, I specialize in building modern, responsive web
        applications using React.js and the MERN stack. My experience spans from developing clean component-based
        UIs to integrating AI/ML features like RAG pipelines and recommendation systems. I thrive at the
        intersection of clean code, great user experience, and emerging technology.
      </p>

      {/* Photo + Info */}
      <div data-aos="fade-up" data-aos-delay="150" className="about-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, alignItems: 'start', marginBottom: 60,
      }}>
        <div className="about-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="about-img-wrap" style={{ position: 'relative', display: 'inline-block', width: 280, height: 280 }}>
            {/* Rotating border ring */}
            <div style={{
              position: 'absolute', inset: -6,
              borderRadius: '50%',
              background: 'conic-gradient(var(--primary) 0deg, transparent 120deg, var(--primary) 240deg, transparent 360deg)',
              animation: 'spinRing 6s linear infinite',
            }} />
            {/* White gap ring */}
            <div style={{
              position: 'absolute', inset: -2,
              borderRadius: '50%',
              background: '#fff',
            }} />
            <img
              src="/haseeb.jpg"
              alt="Haseeb Raza"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/0dcaf0/ffffff?text=HR'; }}
              style={{
                width: 280, height: 280, borderRadius: '50%',
                objectFit: 'cover', objectPosition: 'top center',
                position: 'relative', zIndex: 1,
                display: 'block',
                boxShadow: '0 12px 40px rgba(13,202,240,0.25)',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
          <style>{`
            @keyframes spinRing {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        <div>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.4rem', marginBottom: 10 }}>
            Frontend Developer &amp; CS Student.
          </h3>
          <p style={{ color: '#555', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>
            Passionate CS student at FAST-NUCES. Enthusiastic about Frontend Development and AI/ML.
            I love building clean, scalable web applications and exploring cutting-edge technologies.
            Join me on LinkedIn and GitHub on this journey of innovation.
          </p>

          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
            {[
              ['Website', 'My Portfolio'],
              ['Phone', '+92 3184006367'],
              ['City', 'Lahore, Pakistan'],
              ['Degree', 'BS Computer Science'],
              ['Email', 'haseebzahid4998@gmail.com'],
              ['Freelance', 'Available'],
            ].map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: '0.9rem' }}>
                <i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.75rem' }} />
                <span>
                  <strong style={{ color: '#333' }}>{key}: </strong>
                  <span style={{ color: key === 'Freelance' ? 'var(--primary)' : '#666' }}>{val}</span>
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} data-aos="fade-up" data-aos-delay="200" className="stats-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
      }}>
        {stats.map(({ value, label, suffix }, i) => (
          <StatCard key={label} value={value} label={label} suffix={suffix} isVisible={statsVisible} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about { padding: 60px 30px !important; }
          #about .about-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          #about .about-grid .about-img { justify-content: center !important; }
          #about .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          #about { padding: 50px 16px !important; }
          #about .about-img-wrap { width: 200px !important; height: 200px !important; }
          #about .about-img-wrap img { width: 200px !important; height: 200px !important; }
          #about .info-grid { grid-template-columns: 1fr !important; }
          #about .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
