import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const icons = ['monitor', 'layers', 'smartphone', 'cpu', 'database', 'code'];
const empty = { title: '', description: '', icon: 'code', tags: '' };

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => api.get('/services').then(({ data }) => setServices(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editing) { await api.put(`/services/${editing}`, payload); toast.success('Updated'); }
      else { await api.post('/services', payload); toast.success('Added'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch { toast.error('Save failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/services/${id}`); toast.success('Deleted'); load();
  };

  const handleEdit = (s) => {
    setForm({ title: s.title, description: s.description, icon: s.icon, tags: (s.tags || []).join(', ') });
    setEditing(s._id);
    setShowForm(true);
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', marginBottom: 14, boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Manage Services</h2>
        <button className="btn-primary" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`} /> {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: '1rem' }}>{editing ? 'Edit Service' : 'New Service'}</h3>
          <form onSubmit={handleSubmit}>
            <input style={inputStyle} placeholder="Service title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} placeholder="Description *" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />

            {/* Tags input */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.82rem', color: '#555', display: 'block', marginBottom: 5 }}>
                Sub-type Tags <span style={{ color: '#aaa' }}>(comma separated, e.g. React.js, Figma, Wireframing)</span>
              </label>
              <input
                style={{ ...inputStyle, marginBottom: 0 }}
                placeholder="React.js, Tailwind CSS, JavaScript"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              {/* Live preview */}
              {form.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag} style={{
                      padding: '2px 10px', border: '1px solid var(--primary)',
                      borderRadius: 20, color: 'var(--primary)', fontSize: '0.75rem',
                      background: 'rgba(13,202,240,0.05)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Icon picker */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: '0.85rem', color: '#555', marginBottom: 8, display: 'block' }}>Icon</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {icons.map((ic) => (
                  <button type="button" key={ic} onClick={() => setForm({ ...form, icon: ic })} style={{
                    padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem',
                    background: form.icon === ic ? 'var(--primary)' : '#f0f0f0',
                    color: form.icon === ic ? '#fff' : '#555',
                    border: 'none', fontWeight: 500,
                  }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn-primary"><i className="fas fa-save" /> Save</button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {services.map((s) => (
          <div key={s._id} style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: '3px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.title}</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(s)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><i className="fas fa-edit" /></button>
                <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><i className="fas fa-trash" /></button>
              </div>
            </div>
            <p style={{ color: '#777', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: 10 }}>{s.description}</p>
            {s.tags && s.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '2px 10px', border: '1px solid var(--primary)',
                    borderRadius: 20, color: 'var(--primary)', fontSize: '0.73rem',
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
    </div>
  );
}
