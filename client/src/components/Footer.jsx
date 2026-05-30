import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-dark)',
      padding: '24px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
        &copy; {new Date().getFullYear()} <strong style={{ color: '#fff' }}>Haseeb Raza</strong>. All Rights Reserved.
      </p>
      <Link
        to="/admin/login"
        style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.3s' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; }}
      >
        Admin
      </Link>
    </footer>
  );
}
