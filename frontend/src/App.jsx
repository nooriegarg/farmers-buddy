import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, RoleRoute } from './routes/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/shared/ProfilePage';
import { useAuth } from './context/useAuth';

// Simple Landing Page (inline to avoid import issues)
const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const getDash = () => {
    if (!isAuthenticated) return '/login';
    if (user?.role === 'ADMIN') return '/admin/dashboard';
    if (user?.role === 'OFFICER') return '/officer/dashboard';
    return '/farmer/dashboard';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🌾</span>
          <strong style={{ color: '#15803d', fontSize: '1.2rem' }}>Farmers Buddy</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isAuthenticated ? (
            <Link to={getDash()} style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ padding: '0.5rem 1.5rem', border: '2px solid #16a34a', color: '#16a34a', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
              <Link to="/register" style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get Started</Link>
            </>
          )}
        </div>
      </nav>
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌾</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          Empowering India's <span style={{ color: '#16a34a' }}>Farmers</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
          Connect with agriculture officers, access market prices, get crop recommendations, and join training programs — all in one place.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ padding: '0.75rem 2rem', background: '#16a34a', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>Start for Free →</Link>
          <Link to="/login" style={{ padding: '0.75rem 2rem', border: '2px solid #e5e7eb', color: '#374151', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Sign In</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '4rem' }}>
          {[
            { icon: '🌱', title: 'Crop Tips', desc: 'Expert recommendations' },
            { icon: '💬', title: 'Query Forum', desc: 'Ask & get answers' },
            { icon: '📊', title: 'Mandi Prices', desc: 'Real-time market data' },
            { icon: '🎓', title: 'Training', desc: 'Workshops & programs' },
          ].map(f => (
            <div key={f.title} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
              <strong style={{ color: '#0f172a' }}>{f.title}</strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Simple Dashboard placeholder
const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🌾</span>
          <strong style={{ color: '#15803d' }}>Farmers Buddy</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>{user?.role}</span>
          <span style={{ color: '#374151', fontWeight: 500 }}>{user?.username}</span>
          <button onClick={() => { logout(); window.location.href = '/'; }} style={{ padding: '0.4rem 1rem', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>Logout</button>
        </div>
      </nav>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
          Welcome, {user?.username}! {user?.role === 'FARMER' ? '👨‍🌾' : user?.role === 'OFFICER' ? '👷' : '🛡️'}
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Your {user?.role?.toLowerCase()} dashboard</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { icon: '💬', label: 'Queries', color: '#dbeafe' },
            { icon: '🌱', label: 'Crop Tips', color: '#dcfce7' },
            { icon: '📊', label: 'Mandi Prices', color: '#fef9c3' },
            { icon: '🎓', label: 'Training', color: '#f3e8ff' },
          ].map(c => (
            <div key={c.label} style={{ background: c.color, padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <strong style={{ color: '#0f172a' }}>{c.label}</strong>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Profile Info</h2>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/farmer/dashboard" element={<RoleRoute roles={['FARMER']}><Dashboard /></RoleRoute>} />
        <Route path="/officer/dashboard" element={<RoleRoute roles={['OFFICER']}><Dashboard /></RoleRoute>} />
        <Route path="/admin/dashboard" element={<RoleRoute roles={['ADMIN']}><Dashboard /></RoleRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </AuthProvider>
  </BrowserRouter>
);

export default App;