import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

export default function ManageResume() {
  const [uploading, setUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('/resume.pdf');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') { toast.error('Please select a PDF file'); return; }
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setPdfUrl(data.url);
      toast.success('Resume uploaded successfully!');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24 }}>Manage Resume</h2>

      <div style={{ background: '#fff', borderRadius: 10, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Upload New Resume PDF</h3>
        <div style={{
          border: '2px dashed #ddd', borderRadius: 10, padding: '32px 24px', textAlign: 'center',
          cursor: 'pointer', transition: 'border-color 0.3s', marginBottom: 20,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#ddd'; }}
        >
          <i className="fas fa-file-pdf" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: 12, display: 'block' }} />
          <p style={{ color: '#555', marginBottom: 12, fontSize: '0.95rem' }}>
            Drag &amp; drop a PDF here, or click to select
          </p>
          <label className="btn-primary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-upload" />
            {uploading ? 'Uploading…' : 'Choose PDF'}
            <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Current Resume Preview</h4>
          <div style={{ background: '#333', borderRadius: 8, padding: 8 }}>
            <iframe src={pdfUrl} title="Resume Preview" style={{ width: '100%', height: 500, border: 'none', borderRadius: 4 }} />
          </div>
          <div style={{ marginTop: 14 }}>
            <a href={pdfUrl} download="Haseeb_Raza_Resume.pdf" className="btn-outline">
              <i className="fas fa-download" /> Download Current Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
