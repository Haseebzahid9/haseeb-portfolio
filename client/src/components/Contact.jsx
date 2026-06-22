import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const inputStyle = {
  width: '100%', padding: '12px 16px', border: '1px solid #ddd',
  borderRadius: 6, fontFamily: 'Open Sans, sans-serif', fontSize: '0.92rem',
  outline: 'none', background: '#fafafa',
  transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.2s',
};

const infoItems = [
  { icon: 'fas fa-map-marker-alt', label: 'Location',     value: 'Lahore, Pakistan' },
  { icon: 'fas fa-envelope',       label: 'Email',        value: 'haseebzahid4998@gmail.com' },
  { icon: 'fas fa-phone',          label: 'Phone',        value: '+92 3184006367' },
  { icon: 'fas fa-clock',          label: 'Availability', value: 'Available for Freelance' },
];

function InfoCard({ icon, label, value }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', gap: 18, marginBottom: 20, alignItems: 'flex-start',
        padding: '12px 14px', borderRadius: 8,
        background: hov ? '#fff' : 'transparent',
        border: `1.5px solid ${hov ? 'var(--primary)' : 'transparent'}`,
        transform: hov ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: hov ? '0 4px 18px rgba(13,202,240,0.12)' : 'none',
        transition: 'all 0.28s cubic-bezier(.34,1.3,.64,1)',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: '50%', background: 'var(--primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        boxShadow: hov ? '0 6px 18px rgba(13,202,240,0.35)' : 'none',
        transition: 'box-shadow 0.25s',
      }}>
        <i className={icon} style={{ color: '#fff' }} />
      </div>
      <div style={{ paddingTop: 2 }}>
        <div style={{ fontWeight: 700, fontFamily: 'Poppins', fontSize: '0.9rem', color: '#333', marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ color: '#666', fontSize: '0.88rem' }}>{value}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) { toast.error('Please enter a valid email.'); return; }
    setLoading(true);
    try {
      await api.post('/messages', form);
      toast.success('Your message has been sent. Thank you!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFocus = (e) => {
    e.target.style.borderColor = 'var(--primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(13,202,240,0.12)';
    e.target.style.transform = 'scale(1.005)';
  };
  const onBlur = (e) => {
    e.target.style.borderColor = '#ddd';
    e.target.style.boxShadow = 'none';
    e.target.style.transform = 'scale(1)';
  };

  return (
    <section id="contact" style={{ background: 'var(--bg-light)', padding: '80px 60px' }}>
      <div data-aos="fade-up">
        <h2 className="section-title">Contact</h2>
        <div className="section-title-underline" />
        <p style={{ color: '#666', marginBottom: 50, maxWidth: 700, lineHeight: 1.8, fontSize: '0.95rem' }}>
          Have a project in mind or want to collaborate? Feel free to reach out — I'm always open to new opportunities.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'start' }}>

        {/* Info */}
        <div data-aos="fade-right">
          {infoItems.map((item) => <InfoCard key={item.label} {...item} />)}

          <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingLeft: 4 }}>
            {[
              { href: 'https://www.linkedin.com/in/haseebraza4998/', icon: 'fab fa-linkedin-in' },
              { href: 'https://github.com/Haseebzahid9',             icon: 'fab fa-github' },
            ].map(({ href, icon }) => (
              <a
                key={icon} href={href} target="_blank" rel="noreferrer"
                style={{
                  width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                  transition: 'transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-7px) scale(1.12)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(13,202,240,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form data-aos="fade-left" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Your Name" style={inputStyle}
              onFocus={onFocus} onBlur={onBlur}
            />
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="Your Email" style={inputStyle}
              onFocus={onFocus} onBlur={onBlur}
            />
          </div>
          <input
            name="subject" value={form.subject} onChange={handleChange}
            placeholder="Subject" style={{ ...inputStyle, marginBottom: 16 }}
            onFocus={onFocus} onBlur={onBlur}
          />
          <textarea
            name="message" value={form.message} onChange={handleChange}
            placeholder="Your Message" rows={6}
            style={{ ...inputStyle, resize: 'vertical', marginBottom: 20 }}
            onFocus={onFocus} onBlur={onBlur}
          />
          <button
            type="submit" className="btn-primary" disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              if (loading) return;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,202,240,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Sending…</>
              : <><i className="fas fa-paper-plane" /> Send Message</>}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div:last-child { grid-template-columns: 1fr !important; gap: 30px !important; }
          #contact > div:last-child > form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
