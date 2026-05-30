import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const empty = { title: '', category: 'Full Stack', description: '', technologies: '', github: '', live: '', featured: false, image: '' };
const categories = [
  'Full Stack', 'Frontend', 'Backend', 'AI/ML', 'DSA', 'Mobile', 'Database',
  'C', 'C++', 'C#', 'Python', 'Java', 'JavaScript',
  'DBMS', 'OOP', 'OS', 'Networking', 'Compiler', 'Assembly',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'Cloud', 'DevOps', 'Cybersecurity', 'Blockchain',
];

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => api.get('/projects').then(({ data }) => setProjects(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((f) => ({ ...f, image: data.url }));
      toast.success('Image uploaded!');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editing) { await api.put(`/projects/${editing}`, payload); toast.success('Project updated'); }
      else { await api.post('/projects', payload); toast.success('Project added'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch { toast.error('Save failed'); }
  };

  const handleEdit = (p) => {
    setForm({ ...p, technologies: p.technologies.join(', ') });
    setEditing(p._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`); toast.success('Deleted'); load();
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Manage Projects</h2>
        <button className="btn-primary" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`} /> {showForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 28, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: 20, fontWeight: 600 }}>{editing ? 'Edit Project' : 'New Project'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
              <input style={inputStyle} placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <textarea style={{ ...inputStyle, marginBottom: 14, resize: 'vertical' }} rows={4} placeholder="Description *" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input style={{ ...inputStyle, marginBottom: 14 }} placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
              <input style={inputStyle} placeholder="GitHub URL" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
              <input style={inputStyle} placeholder="Live URL" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: '0.85rem', color: '#555', display: 'block', marginBottom: 6 }}>Project Image</label>
              <input type="file" accept="image/*" onChange={handleFile} style={{ fontSize: '0.85rem' }} />
              {uploading && <span style={{ color: 'var(--primary)', fontSize: '0.82rem', marginLeft: 8 }}><i className="fas fa-spinner fa-spin" /> Uploading…</span>}
              {form.image && <img src={form.image} alt="" style={{ height: 60, marginTop: 8, borderRadius: 4 }} />}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', marginBottom: 18, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured project
            </label>
            <button type="submit" className="btn-primary"><i className="fas fa-save" /> Save Project</button>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Title', 'Category', 'Technologies', 'Featured', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#444', borderBottom: '1px solid #eee' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: 'rgba(13,202,240,0.1)', color: 'var(--primary)', padding: '2px 10px', borderRadius: 12, fontSize: '0.78rem', fontWeight: 600 }}>{p.category}</span>
                </td>
                <td style={{ padding: '12px 16px', color: '#777', maxWidth: 200 }}>{p.technologies?.slice(0, 3).join(', ')}{p.technologies?.length > 3 ? '…' : ''}</td>
                <td style={{ padding: '12px 16px' }}>{p.featured ? '⭐' : '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleEdit(p)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: 12, fontSize: '0.9rem' }}>
                    <i className="fas fa-edit" />
                  </button>
                  <button onClick={() => handleDelete(p._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: '#999' }}>No projects yet. Add one above.</p>}
      </div>
    </div>
  );
}
