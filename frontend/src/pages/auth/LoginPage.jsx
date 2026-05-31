import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/useAuth';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (result.success) {
      toast.success('Welcome back!');
      if (result.role === 'ADMIN') navigate('/admin/dashboard');
      else if (result.role === 'OFFICER') navigate('/officer/dashboard');
      else navigate('/farmer/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 gradient-green flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        <div className="relative text-center text-white max-w-sm">
          <div className="text-6xl mb-6">🌾</div>
          <h2 className="text-3xl font-extrabold mb-3">Farmers Buddy</h2>
          <p className="text-green-100 text-base leading-relaxed mb-10">
            Empowering India's farmers with expert knowledge, real-time prices, and community support.
          </p>
          <div className="grid grid-cols-2 gap-3 text-left">
            {['💬 Expert Answers', '📊 Live Prices', '🌱 Crop Tips', '🎓 Free Training'].map(f => (
              <div key={f} className="bg-white/15 rounded-xl px-4 py-3 text-sm font-medium text-white">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex w-12 h-12 gradient-green rounded-2xl items-center justify-center text-white text-2xl mb-4 shadow-lg">🌾</div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to your Farmers Buddy account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                <input
                  name="username" value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  className="input-field" placeholder="Enter your username" required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    name="password" type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="input-field pr-11" placeholder="Enter your password" required
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPwd ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              New to Farmers Buddy?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">Create account</Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl text-xs text-slate-600">
            <p className="font-semibold text-green-700 mb-1">🚀 Quick Demo</p>
            Register as FARMER, OFFICER, or ADMIN to explore all features.
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;