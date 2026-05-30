import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const empty = { name: '', title: '', bioshort: '', biolong: '', phone: '', email: '', city: '', degree: '', freelance: '', github: '', linkedin: '', instagram: '' };

export default function ManageProfile() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/profile').then(({ data }) => setForm(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/profile', form);
      toast.success('Profile updated successfully!');
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const inp = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };
  const label = { fontSize: '0.8rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 5 };
  const field = (lbl, key, type = 'text', ph = '') => (
    <div style={{ marginBottom: 16 }}>
      <label style={label}>{lbl}</label>
      <input style={inp} type={type} placeholder={ph} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
    </div>
  );

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#888' }}><i className="fas fa-spinner fa-spin" /> Loading…</div>;

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24 }}>Manage Profile & Bio</h2>
      <form onSubmit={handleSubmit}>

        {/* Personal Info */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 18, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-user" /> Personal Info
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {field('Full Name', 'name', 'text', 'Haseeb Raza')}
            {field('Job Title', 'title', 'text', 'Frontend Developer')}
            {field('Phone', 'phone', 'text', '+92 3184006367')}
            {field('Email', 'email', 'email', 'haseebzahid4998@gmail.com')}
            {field('City', 'city', 'text', 'Lahore, Pakistan')}
            {field('Degree', 'degree', 'text', 'BS Computer Science')}
            {field('Freelance Status', 'freelance', 'text', 'Available')}
          </div>
        </div>

        {/* Bio */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 18, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-pen" /> Bio
          </h3>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Short Bio (italic paragraph in About section)</label>
            <textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={form.bioshort || ''} onChange={e => setForm(f => ({ ...f, bioshort: e.target.value }))} placeholder="Passionate CS student at FAST-NUCES…" />
          </div>
          <div>
            <label style={label}>Full Bio (main paragraph in About section)</label>
            <textarea style={{ ...inp, resize: 'vertical' }} rows={4} value={form.biolong || ''} onChange={e => setForm(f => ({ ...f, biolong: e.target.value }))} placeholder="As a Frontend Developer and CS student…" />
          </div>
        </div>

        {/* Social Links */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 18, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-share-alt" /> Social Links
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {field('GitHub URL', 'github', 'url', 'https://github.com/...')}
            {field('LinkedIn URL', 'linkedin', 'url', 'https://linkedin.com/in/...')}
            {field('Instagram URL', 'instagram', 'url', 'https://instagram.com/...')}
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-save" /> Save Profile</>}
        </button>
      </form>
    </div>
  );
}
