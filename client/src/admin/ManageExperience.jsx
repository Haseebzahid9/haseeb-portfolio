import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const empty = { role: '', company: '', location: '', period: '', points: '' };

export default function ManageExperience() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => api.get('/experience').then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, points: form.points.split('\n').map(p => p.trim()).filter(Boolean) };
    try {
      if (editing) { await api.put(`/experience/${editing}`, payload); toast.success('Updated'); }
      else { await api.post('/experience', payload); toast.success('Added'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch { toast.error('Save failed'); }
  };

  const handleEdit = (item) => {
    setForm({ role: item.role, company: item.company, location: item.location || '', period: item.period, points: (item.points || []).join('\n') });
    setEditing(item._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/experience/${id}`); toast.success('Deleted'); load();
  };

  const inp = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Work Experience</h2>
        <button className="btn-primary" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`} /> {showForm ? 'Cancel' : 'Add Experience'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <input style={inp} placeholder="Role / Position *" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
              <input style={inp} placeholder="Company Name *" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <input style={inp} placeholder="Location (e.g. Lahore, Pakistan)" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              <input style={inp} placeholder="Period (e.g. June 2025 – Aug 2025) *" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} required />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: '0.82rem', color: '#555', display: 'block', marginBottom: 5 }}>Bullet Points <span style={{ color: '#aaa' }}>(one per line)</span></label>
              <textarea style={{ ...inp, resize: 'vertical' }} rows={5} placeholder={'Developed React.js features...\nBuilt responsive interfaces...'} value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary"><i className="fas fa-save" /> Save</button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map(item => (
          <div key={item._id} style={{ background: '#fff', borderRadius: 10, padding: '20px 22px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>{item.role}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>{item.company}</p>
                <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{item.period} {item.location && `· ${item.location}`}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><i className="fas fa-edit" /></button>
                <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><i className="fas fa-trash" /></button>
              </div>
            </div>
            {item.points?.length > 0 && (
              <ul style={{ marginTop: 10, paddingLeft: 18, color: '#666', fontSize: '0.85rem', lineHeight: 1.8 }}>
                {item.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            )}
          </div>
        ))}
        {items.length === 0 && <p style={{ color: '#999', textAlign: 'center', padding: 40 }}>No experience added yet.</p>}
      </div>
    </div>
  );
}
