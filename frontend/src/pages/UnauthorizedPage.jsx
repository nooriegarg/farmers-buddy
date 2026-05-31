import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const UnauthorizedPage = () => {
  const { user } = useAuth();
  const dash = user?.role === 'ADMIN' ? '/admin/dashboard'
    : user?.role === 'OFFICER' ? '/officer/dashboard' : '/farmer/dashboard';
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">🚫</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">You don't have permission to view this page.</p>
        <Link to={dash} className="btn-primary">Go to Dashboard</Link>
      </div>
    </div>
  );
};
export default UnauthorizedPage;