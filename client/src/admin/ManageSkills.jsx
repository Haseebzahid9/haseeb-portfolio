import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const cats = ['Languages', 'Frontend', 'Backend', 'AI/ML', 'Tools'];
const empty = { name: '', percentage: 80, category: 'Frontend' };

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const load = () => api.get('/skills').then(({ data }) => setSkills(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put(`/skills/${editing}`, form); toast.success('Skill updated'); }
      else { await api.post('/skills', form); toast.success('Skill added'); }
      setForm(empty); setEditing(null); load();
    } catch { toast.error('Save failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/skills/${id}`); toast.success('Deleted'); load();
  };

  const inputStyle = { padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' };

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24 }}>Manage Skills</h2>

      <div style={{ background: '#fff', borderRadius: 10, padding: 24, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: '1rem' }}>{editing ? 'Edit Skill' : 'Add Skill'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <input style={{ ...inputStyle, flex: '1 1 160px' }} placeholder="Skill name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginBottom: 4 }}>Percentage: {form.percentage}%</label>
            <input type="range" min={0} max={100} value={form.percentage} onChange={(e) => setForm({ ...form, percentage: +e.target.value })} style={{ width: '100%', accentColor: 'var(--primary)' }} />
          </div>
          <select style={{ ...inputStyle, flex: '1 1 130px' }} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary"><i className="fas fa-save" /> {editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" className="btn-outline" onClick={() => { setForm(empty); setEditing(null); }}>Cancel</button>}
        </form>
      </div>

      <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {cats.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (!catSkills.length) return null;
          return (
            <div key={cat} style={{ marginBottom: 28 }}>
              <h4 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{cat}</h4>
              {catSkills.map((s) => (
                <div key={s._id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ width: 160, fontSize: '0.88rem', fontWeight: 500 }}>{s.name}</span>
                  <div style={{ flex: 1, height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.percentage}%`, background: 'var(--primary)', borderRadius: 4 }} />
                  </div>
                  <span style={{ width: 40, fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}>{s.percentage}%</span>
                  <button onClick={() => { setForm({ name: s.name, percentage: s.percentage, category: s.category }); setEditing(s._id); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><i className="fas fa-edit" /></button>
                  <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><i className="fas fa-trash" /></button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
