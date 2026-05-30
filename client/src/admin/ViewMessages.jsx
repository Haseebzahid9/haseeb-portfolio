import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => api.get('/messages').then(({ data }) => setMessages(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    setMessages((m) => m.map((msg) => msg._id === id ? { ...msg, read: true } : msg));
    if (selected?._id === id) setSelected((s) => ({ ...s, read: true }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await api.delete(`/messages/${id}`);
    toast.success('Deleted');
    setSelected(null);
    load();
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Messages Inbox</h2>
        {unread > 0 && (
          <span style={{ background: '#dc3545', color: '#fff', borderRadius: 20, padding: '2px 10px', fontSize: '0.78rem', fontWeight: 700 }}>
            {unread} unread
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20, alignItems: 'start' }}>
        {/* List */}
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {messages.length === 0 && <p style={{ padding: 32, textAlign: 'center', color: '#999' }}>No messages yet.</p>}
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => { setSelected(msg); if (!msg.read) markRead(msg._id); }}
              style={{
                padding: '14px 18px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0',
                background: selected?._id === msg._id ? 'rgba(13,202,240,0.06)' : '#fff',
                borderLeft: !msg.read ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { if (selected?._id !== msg._id) e.currentTarget.style.background = '#f8f9fa'; }}
              onMouseLeave={(e) => { if (selected?._id !== msg._id) e.currentTarget.style.background = '#fff'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: msg.read ? 500 : 700, fontSize: '0.9rem' }}>{msg.name}</span>
                {!msg.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: msg.read ? 400 : 600, marginBottom: 3 }}>{msg.subject}</div>
              <div style={{ fontSize: '0.78rem', color: '#aaa' }}>{new Date(msg.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div style={{ background: '#fff', borderRadius: 10, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{selected.subject}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>
                  From: <strong>{selected.name}</strong> &lt;{selected.email}&gt;
                </p>
                <p style={{ color: '#aaa', fontSize: '0.78rem', marginTop: 3 }}>
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
              <button onClick={() => handleDelete(selected._id)} style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#dc3545', padding: '7px 14px', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500 }}>
                <i className="fas fa-trash" /> Delete
              </button>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '18px 20px', lineHeight: 1.8, color: '#444', fontSize: '0.92rem', whiteSpace: 'pre-wrap' }}>
              {selected.message}
            </div>
            <div style={{ marginTop: 16 }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary">
                <i className="fas fa-reply" /> Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 10, padding: 48, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center', color: '#bbb' }}>
            <i className="fas fa-envelope-open" style={{ fontSize: '2.5rem', marginBottom: 12, display: 'block' }} />
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
}
