import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="max-w-lg">
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              {user?.role === 'FARMER' ? '👨‍🌾' : user?.role === 'OFFICER' ? '👷' : '🛡️'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.fullName || user?.username}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <div className="mt-1"><Badge label={user?.role} /></div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Username', value: user?.username },
              { label: 'Email', value: user?.email },
              { label: 'Full Name', value: user?.fullName || 'Not set' },
              { label: 'Phone', value: user?.phoneNumber || 'Not set' },
              { label: 'Role', value: user?.role },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="font-medium text-gray-500">{label}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default ProfilePage;