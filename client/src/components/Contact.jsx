import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

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

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1px solid #ddd',
    borderRadius: 6, fontFamily: 'Open Sans, sans-serif', fontSize: '0.92rem',
    outline: 'none', transition: 'border-color 0.3s',
    background: '#fafafa',
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
          {[
            { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Lahore, Pakistan' },
            { icon: 'fas fa-envelope', label: 'Email', value: 'haseebzahid4998@gmail.com' },
            { icon: 'fas fa-phone', label: 'Phone', value: '+92 3184006367' },
            { icon: 'fas fa-clock', label: 'Availability', value: 'Available for Freelance' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ display: 'flex', gap: 18, marginBottom: 28, alignItems: 'flex-start' }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%', background: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <i className={icon} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontFamily: 'Poppins', fontSize: '0.9rem', color: '#333', marginBottom: 2 }}>{label}</div>
                <div style={{ color: '#666', fontSize: '0.88rem' }}>{value}</div>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            {[
              { href: 'https://www.linkedin.com/in/haseebraza4998/', icon: 'fab fa-linkedin-in' },
              { href: 'https://github.com/Haseebzahid9', icon: 'fab fa-github' },
            ].map(({ href, icon }) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer" style={{
                width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                transition: 'transform 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
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
              onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#ddd'; }}
            />
            <input
              name="email" value={form.email} onChange={handleChange}
              type="email" placeholder="Your Email" style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#ddd'; }}
            />
          </div>
          <input
            name="subject" value={form.subject} onChange={handleChange}
            placeholder="Subject" style={{ ...inputStyle, marginBottom: 16 }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#ddd'; }}
          />
          <textarea
            name="message" value={form.message} onChange={handleChange}
            placeholder="Your Message" rows={6}
            style={{ ...inputStyle, resize: 'vertical', marginBottom: 20 }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#ddd'; }}
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? <><i className="fas fa-spinner fa-spin" /> Sending…</> : <><i className="fas fa-paper-plane" /> Send Message</>}
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
