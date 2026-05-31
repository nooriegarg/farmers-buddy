import { Suspense } from 'react';
import { RoleRoute, ProtectedRoute } from './ProtectedRoute';

const Spin = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', flexDirection: 'column', gap: 12 }}>
    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #dcfce7', borderTopColor: '#16a34a', animation: 'spin 0.8s linear infinite' }} />
    <p style={{ color: '#64748b', fontSize: 14 }}>Loading...</p>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

export const LazyRoleRoute = ({ component: Component, roles }) => (
  <RoleRoute roles={roles}>
    <Suspense fallback={<Spin />}>
      <Component />
    </Suspense>
  </RoleRoute>
);

export const LazyProtectedRoute = ({ component: Component }) => (
  <ProtectedRoute>
    <Suspense fallback={<Spin />}>
      <Component />
    </Suspense>
  </ProtectedRoute>
);