import { useState } from 'react';

export default function Resume() {
  const [zoom, setZoom] = useState(0.68);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/assets/Haseeb_Zahid_cv_s.pdf';
    a.download = 'Haseeb_Raza_Resume.pdf';
    a.click();
  };

  const handleOpen = () => {
    window.open('/assets/Haseeb_Zahid_cv_s.pdf', '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" style={{ background: 'var(--bg-light)', padding: '80px 60px' }}>

      {/* Section heading */}
      <div data-aos="fade-up">
        <h2 className="section-title">Resume</h2>
        <div className="section-title-underline" />
        <p style={{ color: '#666', marginBottom: 50, fontSize: '0.95rem', maxWidth: 700, lineHeight: 1.8 }}>
          Experienced with JavaScript, React.js, Node.js, Python, SQL, MongoDB, and modern AI/ML tools.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, marginBottom: 60 }}>
        <div data-aos="fade-right">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className="fas fa-briefcase" style={{ color: 'var(--primary)' }} /> Work Experience
          </h3>
          <div style={{ position: 'relative', paddingLeft: 28, borderLeft: '2px solid #e0e0e0' }}>
            <div style={{ position: 'absolute', left: -9, top: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--primary)', border: '3px solid #fff', boxShadow: '0 0 0 2px var(--primary)' }} />
            <div style={{ background: '#fff', padding: '20px 22px', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,202,240,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}
            >
              <span style={{ background: 'var(--primary)', color: '#fff', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>June 2025 – August 2025</span>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, margin: '10px 0 4px', fontSize: '1rem' }}>React Developer Intern</h4>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: 12 }}>Amrood Labs (Pvt) Ltd — Lahore, Pakistan</p>
              <ul style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.9, paddingLeft: 18 }}>
                <li>Developed frontend features with React.js, JavaScript (ES6), HTML, CSS, Tailwind CSS</li>
                <li>Built responsive interfaces using component-based architecture and state management</li>
                <li>Contributed to Agile workflows through code reviews and team collaboration</li>
              </ul>
            </div>
          </div>
        </div>

        <div data-aos="fade-left">
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className="fas fa-graduation-cap" style={{ color: 'var(--primary)' }} /> Education
          </h3>
          <div style={{ position: 'relative', paddingLeft: 28, borderLeft: '2px solid #e0e0e0' }}>
            <div style={{ position: 'absolute', left: -9, top: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--primary)', border: '3px solid #fff', boxShadow: '0 0 0 2px var(--primary)' }} />
            <div style={{ background: '#fff', padding: '20px 22px', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,202,240,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}
            >
              <span style={{ background: 'var(--primary)', color: '#fff', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>2023 – 2027</span>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, margin: '10px 0 4px', fontSize: '1rem' }}>BS Computer Science</h4>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: 12 }}>FAST-NUCES — Lahore, Pakistan</p>
              <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.7 }}>
                <strong>Coursework:</strong> OOP, Data Structures &amp; Algorithms, Database Management Systems, Computer Networking, Operating Systems, Artificial Intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div data-aos="fade-up" data-aos-delay="150">
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="fas fa-file-pdf" style={{ color: 'var(--primary)' }} /> Resume PDF
        </h3>

        <div style={{ background: '#323639', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>

          {/* Toolbar */}
          <div style={{
            background: '#474c50', height: 48,
            display: 'flex', alignItems: 'center',
            padding: '0 12px', gap: 8, userSelect: 'none',
          }}>
            {/* Left: menu + filename */}
            <button style={tbBtn()} title="Menu"><i className="fas fa-bars" /></button>
            <span style={{ color: '#e0e0e0', fontSize: '0.82rem', fontFamily: 'Poppins', marginLeft: 4, marginRight: 8 }}>
              haseeb_cv.pdf
            </span>

            {/* Page nav */}
            <button style={tbBtn()} title="Previous page"><i className="fas fa-chevron-left" /></button>
            <span style={{ color: '#e0e0e0', fontSize: '0.8rem', minWidth: 36, textAlign: 'center' }}>1 / 1</span>
            <button style={tbBtn()} title="Next page"><i className="fas fa-chevron-right" /></button>

            <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.15)', margin: '0 6px' }} />

            {/* Zoom */}
            <button style={tbBtn()} title="Zoom out"
              onClick={() => setZoom(z => Math.max(+(z - 0.1).toFixed(2), 0.25))}>
              <i className="fas fa-minus" />
            </button>
            <span style={{ color: '#e0e0e0', fontSize: '0.8rem', minWidth: 44, textAlign: 'center' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button style={tbBtn()} title="Zoom in"
              onClick={() => setZoom(z => Math.min(+(z + 0.1).toFixed(2), 2.0))}>
              <i className="fas fa-plus" />
            </button>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Action buttons */}
            <button style={tbBtn()} title="Download" onClick={handleDownload}>
              <i className="fas fa-download" />
            </button>
            <button style={tbBtn()} title="Open in new tab" onClick={handleOpen}>
              <i className="fas fa-external-link-alt" />
            </button>
            <button style={tbBtn()} title="Print" onClick={handlePrint}>
              <i className="fas fa-print" />
            </button>
          </div>

          {/* Body: left panel + right panel */}
          <div style={{ display: 'flex', height: 700 }}>

            {/* Left thumbnail panel */}
            <div style={{
              width: 160, flexShrink: 0,
              background: '#1e1e1e',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', padding: '20px 12px',
              gap: 10, overflowY: 'auto',
            }}>
              <div style={{ border: '2px solid #0dcaf0', borderRadius: 3, overflow: 'hidden', width: '100%', boxShadow: '0 2px 8px rgba(13,202,240,0.3)' }}>
                <img
                  src="/assets/haseeb_cv_preview.jpg"
                  alt="CV page 1"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <span style={{ color: '#aaa', fontSize: '0.75rem', fontFamily: 'Poppins' }}>1</span>
            </div>

            {/* Right main view */}
            <div style={{
              flex: 1, background: '#525659',
              overflow: 'auto', display: 'flex',
              justifyContent: 'center', alignItems: 'flex-start',
              padding: '24px 16px',
            }}>
              <img
                src="/assets/haseeb_cv_preview.jpg"
                alt="Haseeb Raza CV"
                style={{
                  width: `${zoom * 100}%`,
                  maxWidth: 'none',
                  background: '#fff',
                  display: 'block',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #resume > div:nth-child(3) { grid-template-columns: 1fr !important; gap: 30px !important; }
          #resume > div:nth-child(4) > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function tbBtn() {
  return {
    background: 'none', border: 'none', color: '#ccc',
    cursor: 'pointer', padding: '6px 8px', borderRadius: 4,
    fontSize: '0.82rem', display: 'flex', alignItems: 'center',
    justifyContent: 'center', transition: 'background 0.2s, color 0.2s',
    lineHeight: 1,
  };
}
