import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const empty = { degree: '', institution: '', period: '', coursework: '' };

export default function ManageEducation() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => api.get('/education').then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put(`/education/${editing}`, form); toast.success('Updated'); }
      else { await api.post('/education', form); toast.success('Added'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch { toast.error('Save failed'); }
  };

  const handleEdit = (item) => {
    setForm({ degree: item.degree, institution: item.institution, period: item.period, coursework: item.coursework || '' });
    setEditing(item._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/education/${id}`); toast.success('Deleted'); load();
  };

  const inp = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Education</h2>
        <button className="btn-primary" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`} /> {showForm ? 'Cancel' : 'Add Education'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <input style={inp} placeholder="Degree *" value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} required />
              <input style={inp} placeholder="Institution *" value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} required />
            </div>
            <input style={{ ...inp, marginBottom: 14 }} placeholder="Period (e.g. 2023 – 2027) *" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} required />
            <textarea style={{ ...inp, resize: 'vertical', marginBottom: 18 }} rows={3} placeholder="Relevant Coursework" value={form.coursework} onChange={e => setForm({ ...form, coursework: e.target.value })} />
            <button type="submit" className="btn-primary"><i className="fas fa-save" /> Save</button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map(item => (
          <div key={item._id} style={{ background: '#fff', borderRadius: 10, padding: '20px 22px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: '4px solid #6f42c1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>{item.degree}</h3>
                <p style={{ color: '#6f42c1', fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>{item.institution}</p>
                <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{item.period}</p>
                {item.coursework && <p style={{ color: '#666', fontSize: '0.83rem', marginTop: 6 }}><strong>Coursework:</strong> {item.coursework}</p>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><i className="fas fa-edit" /></button>
                <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><i className="fas fa-trash" /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ color: '#999', textAlign: 'center', padding: 40 }}>No education added yet.</p>}
      </div>
    </div>
  );
}
