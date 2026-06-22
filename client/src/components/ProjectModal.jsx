import { useEffect } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-inner"
        style={{
          background: '#fff', borderRadius: 12, maxWidth: 700, width: '100%',
          maxHeight: '90vh', overflowY: 'auto', animation: 'slideUp 0.25s ease',
        }}
      >
        {/* Header image */}
        <div className="modal-header-img" style={{ position: 'relative', height: 260, background: '#0d1117', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
          {project.image ? (
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-code" style={{ fontSize: '4rem', color: 'var(--primary)' }} />
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
              width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '28px 32px 32px' }}>
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.4rem', flex: 1 }}>
              {project.title}
            </h2>
            <span style={{
              background: 'var(--primary)', color: '#fff',
              padding: '3px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
            }}>
              {project.category}
            </span>
          </div>

          <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 22, fontSize: '0.95rem' }}>
            {project.description}
          </p>

          {/* Technologies */}
          <div style={{ marginBottom: 26 }}>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, marginBottom: 10, fontSize: '0.9rem', color: '#333' }}>
              Technologies Used
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.technologies?.map((tech) => (
                <span key={tech} style={{
                  background: 'rgba(13,202,240,0.1)', color: 'var(--primary)',
                  border: '1px solid rgba(13,202,240,0.3)',
                  padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 500,
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="modal-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">
                <Github size={16} /> View on GitHub
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-outline">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 768px) {
          .modal-inner { padding: 0 !important; }
          .modal-header-img { height: 180px !important; }
          .modal-body { padding: 20px 18px 24px !important; }
          .modal-title { font-size: 1.1rem !important; flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .modal-actions { flex-direction: column !important; }
          .modal-actions a { width: 100% !important; justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .modal-header-img { height: 140px !important; }
          .modal-body { padding: 16px 14px 20px !important; }
        }
      `}</style>
    </div>
  );
}
