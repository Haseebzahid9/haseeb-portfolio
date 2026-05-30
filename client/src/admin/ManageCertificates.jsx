import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const cats = ['Web Development', 'AI/ML', 'Database', 'Cloud', 'Programming', 'Other'];
const empty = { title: '', issuer: '', date: '', category: 'Other', description: '', skills: '', credentialUrl: '', image: '' };

export default function ManageCertificates() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => api.get('/certificates').then(({ data }) => setCerts(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm(f => ({ ...f, image: data.url }));
      toast.success('Image uploaded!');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editing) { await api.put(`/certificates/${editing}`, payload); toast.success('Certificate updated!'); }
      else { await api.post('/certificates', payload); toast.success('Certificate added!'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch { toast.error('Save failed'); }
  };

  const handleEdit = (c) => {
    setForm({
      title: c.title, issuer: c.issuer, date: c.date,
      category: c.category, description: c.description || '',
      skills: (c.skills || []).join(', '),
      credentialUrl: c.credentialUrl || '', image: c.image || '',
    });
    setEditing(c._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    await api.delete(`/certificates/${id}`); toast.success('Deleted'); load();
  };

  const inp = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };
  const lbl = { fontSize: '0.8rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 5 };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Manage Certificates</h2>
        <button className="btn-primary" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`} /> {showForm ? 'Cancel' : 'Add Certificate'}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 28, marginBottom: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 22, fontSize: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-award" /> {editing ? 'Edit Certificate' : 'New Certificate'}
          </h3>
          <form onSubmit={handleSubmit}>

            {/* Row 1 — Title */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Certificate Name *</label>
              <input style={inp} placeholder="e.g. Responsive Website Development" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>

            {/* Row 2 — Issuer + Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <label style={lbl}>Issuing Company / Organization *</label>
                <input style={inp} placeholder="e.g. EDUCBA, Coursera, Google" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} required />
              </div>
              <div>
                <label style={lbl}>Date / Year *</label>
                <input style={inp} placeholder="e.g. 2024" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
              </div>
            </div>

            {/* Row 3 — Category */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Category</label>
              <select style={inp} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Row 4 — Description */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Description</label>
              <textarea style={{ ...inp, resize: 'vertical' }} rows={3} placeholder="What this certificate covers..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>

            {/* Row 5 — Skills */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Skills Covered <span style={{ color: '#aaa', fontWeight: 400 }}>(comma separated)</span></label>
              <input style={inp} placeholder="e.g. HTML, CSS, JavaScript, React.js" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
              {form.skills && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {form.skills.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                    <span key={s} style={{ padding: '2px 10px', border: '1px solid var(--primary)', borderRadius: 20, color: 'var(--primary)', fontSize: '0.75rem', background: 'rgba(13,202,240,0.05)' }}>{s}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Row 6 — Credential URL */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Credential URL <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
              <input style={inp} placeholder="https://..." value={form.credentialUrl} onChange={e => setForm({ ...form, credentialUrl: e.target.value })} />
            </div>

            {/* Row 7 — Image Upload */}
            <div style={{ marginBottom: 22, padding: '16px 18px', background: '#f8f9fa', borderRadius: 8, border: '1px dashed #ddd' }}>
              <label style={{ ...lbl, marginBottom: 10 }}>
                <i className="fas fa-image" style={{ color: 'var(--primary)', marginRight: 6 }} />
                Certificate Image <span style={{ color: '#aaa', fontWeight: 400 }}>(upload the actual certificate)</span>
              </label>
              <input type="file" accept="image/*" onChange={handleFile} style={{ fontSize: '0.85rem' }} />
              {uploading && <span style={{ color: 'var(--primary)', fontSize: '0.82rem', marginLeft: 8 }}><i className="fas fa-spinner fa-spin" /> Uploading…</span>}
              {form.image && (
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={form.image} alt="preview" style={{ height: 90, borderRadius: 6, border: '1px solid #ddd', objectFit: 'contain', background: '#fff' }} />
                  <button type="button" onClick={() => setForm(f => ({ ...f, image: '' }))} style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#dc3545', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
                    <i className="fas fa-times" /> Remove
                  </button>
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary"><i className="fas fa-save" /> Save Certificate</button>
          </form>
        </div>
      )}

      {/* LIST */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {certs.map(c => (
          <div key={c._id} style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', borderLeft: '4px solid var(--primary)' }}>
            {/* Card top */}
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1a1a2e', marginBottom: 3, lineHeight: 1.35 }}>{c.title}</h3>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                      <i className="fas fa-building" style={{ marginRight: 4, fontSize: '0.72rem' }} />{c.issuer}
                    </span>
                    <span style={{ color: '#aaa', fontSize: '0.78rem' }}>
                      <i className="fas fa-calendar-alt" style={{ marginRight: 4, fontSize: '0.72rem' }} />{c.date}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginLeft: 10, flexShrink: 0 }}>
                  <button onClick={() => handleEdit(c)} style={{ background: 'rgba(13,202,240,0.08)', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, fontSize: '0.82rem' }}>
                    <i className="fas fa-edit" />
                  </button>
                  <button onClick={() => handleDelete(c._id)} style={{ background: 'rgba(220,53,69,0.08)', border: 'none', color: '#dc3545', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, fontSize: '0.82rem' }}>
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </div>

              {/* Description */}
              {c.description && <p style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 10 }}>{c.description}</p>}

              {/* Skills */}
              {c.skills?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {c.skills.map(s => (
                    <span key={s} style={{ padding: '2px 10px', border: '1px solid var(--primary)', borderRadius: 20, color: 'var(--primary)', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(13,202,240,0.05)' }}>{s}</span>
                  ))}
                </div>
              )}

              <span style={{ background: 'rgba(13,202,240,0.08)', color: 'var(--primary)', padding: '2px 10px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 600 }}>{c.category}</span>
            </div>

            {/* Certificate image preview */}
            {c.image && (
              <div style={{ borderTop: '1px solid #f5f5f5' }}>
                <img src={c.image} alt={c.title} style={{ width: '100%', height: 80, objectFit: 'contain', background: '#f8f9fa' }} />
              </div>
            )}
          </div>
        ))}
        {certs.length === 0 && (
          <p style={{ color: '#999', gridColumn: '1/-1', textAlign: 'center', padding: 48 }}>
            <i className="fas fa-award" style={{ fontSize: '2rem', marginBottom: 10, display: 'block', opacity: 0.3 }} />
            No certificates yet. Click "Add Certificate" to get started.
          </p>
        )}
      </div>
    </div>
  );
}
