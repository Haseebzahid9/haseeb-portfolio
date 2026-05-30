import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const navLinks = [
  { id: 'hero', label: 'Home', icon: 'fas fa-home' },
  { id: 'about', label: 'About', icon: 'fas fa-user' },
  { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
  { id: 'portfolio', label: 'Portfolio', icon: 'fas fa-image' },
  { id: 'resume', label: 'Resume', icon: 'fas fa-file-alt' },
  { id: 'certificates', label: 'Certificates', icon: 'fas fa-award' },
  { id: 'services', label: 'Services', icon: 'fas fa-server' },
  { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
];

export default function Sidebar({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button
        onClick={onClose}
        style={{
          display: 'none',
          position: 'absolute', top: 15, right: 15,
          background: 'transparent', border: 'none',
          color: '#fff', cursor: 'pointer',
        }}
        className="sidebar-close"
      >
        <X size={20} />
      </button>

      {/* Profile */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          border: '3px solid var(--primary)',
          overflow: 'hidden', margin: '0 auto 14px',
        }}>
          <img
            src="/haseeb.jpg"
            alt="Haseeb Raza"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/110x110/0dcaf0/ffffff?text=HR'; }}
          />
        </div>
        <h2 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Haseeb Raza
        </h2>
      </div>

      {/* Social Icons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { href: 'https://www.linkedin.com/in/haseebraza4998/', icon: 'fab fa-linkedin-in' },
          { href: 'https://github.com/Haseebzahid9', icon: 'fab fa-github' },
          { href: 'https://www.instagram.com/haseebzahid_/', icon: 'fab fa-instagram' },
        ].map(({ href, icon }) => (
          <a
            key={icon}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(13,202,240,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <i className={icon} style={{ fontSize: '0.85rem' }} />
          </a>
        ))}
      </div>

      {/* Nav */}
      <nav style={{ width: '100%' }}>
        {navLinks.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              width: '100%', background: 'none', border: 'none',
              color: activeSection === id ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 16px', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: '0.92rem',
              fontWeight: activeSection === id ? 600 : 400,
              transition: 'all 0.3s',
              marginBottom: 4,
              borderLeft: activeSection === id ? '3px solid var(--primary)' : '3px solid transparent',
            }}
            onMouseEnter={(e) => { if (activeSection !== id) e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { if (activeSection !== id) e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <i className={icon} style={{ width: 18, textAlign: 'center' }} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
