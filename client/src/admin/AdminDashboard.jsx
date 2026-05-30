import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ManageProjects from './ManageProjects';
import ManageSkills from './ManageSkills';
import ManageServices from './ManageServices';
import ManageResume from './ManageResume';
import ViewMessages from './ViewMessages';
import ManageCertificates from './ManageCertificates';
import ManageProfile from './ManageProfile';
import ManageExperience from './ManageExperience';
import ManageEducation from './ManageEducation';

const navItems = [
  { path: '/admin', label: 'Profile & Bio', icon: 'fas fa-user-circle', exact: true },
  { path: '/admin/projects', label: 'Projects', icon: 'fas fa-briefcase' },
  { path: '/admin/skills', label: 'Skills', icon: 'fas fa-code' },
  { path: '/admin/services', label: 'Services', icon: 'fas fa-server' },
  { path: '/admin/certificates', label: 'Certificates', icon: 'fas fa-award' },
  { path: '/admin/experience', label: 'Experience', icon: 'fas fa-building' },
  { path: '/admin/education', label: 'Education', icon: 'fas fa-graduation-cap' },
  { path: '/admin/resume', label: 'Resume PDF', icon: 'fas fa-file-pdf' },
  { path: '/admin/messages', label: 'Messages', icon: 'fas fa-envelope' },
];

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname === path;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#f0f2f5' }}>
      {/* Admin Sidebar */}
      <aside style={{
        width: sidebarOpen ? 230 : 60, background: '#0d1117',
        transition: 'width 0.3s', overflow: 'hidden', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '16px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="fas fa-user" style={{ color: '#000', fontSize: '0.85rem' }} />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{admin?.name || 'Haseeb Raza'}</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem' }}>Administrator</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '10px 6px', overflowY: 'auto' }}>
          {navItems.map(({ path, label, icon, exact }) => (
            <Link key={path} to={path} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px', borderRadius: 7, marginBottom: 2,
              textDecoration: 'none',
              color: isActive(path, exact) ? '#000' : 'rgba(255,255,255,0.6)',
              background: isActive(path, exact) ? 'var(--primary)' : 'transparent',
              transition: 'all 0.2s', fontSize: '0.82rem', fontWeight: 500,
              whiteSpace: 'nowrap',
            }}>
              <i className={icon} style={{ width: 16, textAlign: 'center', flexShrink: 0, fontSize: '0.85rem' }} />
              {sidebarOpen && label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '10px 6px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.82rem', marginBottom: 4, whiteSpace: 'nowrap' }}>
            <i className="fas fa-eye" style={{ width: 16, textAlign: 'center', flexShrink: 0 }} />
            {sidebarOpen && 'View Site'}
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', width: '100%', whiteSpace: 'nowrap' }}>
            <i className="fas fa-sign-out-alt" style={{ width: 16, textAlign: 'center', flexShrink: 0 }} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ background: '#fff', padding: '12px 24px', borderBottom: '1px solid #e8eaed', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: '1.1rem', padding: 4 }}>
            <i className="fas fa-bars" />
          </button>
          <h1 style={{ fontWeight: 700, fontSize: '1rem', color: '#222' }}>
            {navItems.find(n => isActive(n.path, n.exact))?.label || 'Admin Panel'}
          </h1>
        </header>

        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          <Routes>
            <Route index element={<ManageProfile />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="certificates" element={<ManageCertificates />} />
            <Route path="experience" element={<ManageExperience />} />
            <Route path="education" element={<ManageEducation />} />
            <Route path="resume" element={<ManageResume />} />
            <Route path="messages" element={<ViewMessages />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
