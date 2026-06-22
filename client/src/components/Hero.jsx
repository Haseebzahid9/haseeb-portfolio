import Typewriter from 'typewriter-effect';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d1117 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '55%', height: '100%',
        background: 'url("https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80") center/cover no-repeat',
        opacity: 0.15,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #0d1117 40%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          color: '#ffffff',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: 16,
          lineHeight: 1.2,
        }}>
          Haseeb Raza
        </h1>

        <div className="hero-typewriter" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--primary)',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          borderBottom: '2px solid var(--primary)',
          paddingBottom: 4,
          display: 'inline-block',
          minWidth: 280,
        }}>
          <span style={{ color: '#fff', marginRight: 6 }}>I'm a</span>
          <Typewriter
            options={{
              strings: ['Frontend Developer', 'React Developer', 'Full Stack Developer', 'AI/ML Enthusiast'],
              autoStart: true,
              loop: true,
              deleteSpeed: 40,
              delay: 60,
              wrapperClassName: 'typewriter-text',
              cursorClassName: 'typewriter-cursor',
            }}
          />
        </div>

        <div className="hero-buttons" style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className="fas fa-envelope" /> Hire Me
          </button>
          <a href="/assets/Haseeb_Zahid_cv_s.pdf" download className="btn-outline" style={{ textDecoration: 'none' }}>
            <i className="fas fa-download" /> Download CV
          </a>
        </div>
      </div>

      <style>{`
        .typewriter-text { color: var(--primary); }
        .typewriter-cursor { color: var(--primary); }
        @media (max-width: 768px) {
          #hero { padding: 60px 24px !important; min-height: 100svh; }
        }
        @media (max-width: 480px) {
          #hero { padding: 70px 16px 40px !important; }
          #hero h1 { font-size: 2rem !important; }
          #hero .hero-typewriter { min-width: 0 !important; width: 100% !important; }
          #hero .hero-buttons { flex-direction: column !important; align-items: flex-start !important; }
          #hero .hero-buttons a, #hero .hero-buttons button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
