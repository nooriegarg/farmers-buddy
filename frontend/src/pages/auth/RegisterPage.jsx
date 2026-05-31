import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/useAuth';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', password: '', fullName: '', phoneNumber: '', role: 'FARMER'
  });
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);
    if (result.success) {
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  const f = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const roles = [
    { value: 'FARMER', label: 'Farmer', icon: '👨‍🌾', desc: 'Access queries, prices & training' },
    { value: 'OFFICER', label: 'Officer', icon: '👷', desc: 'Answer queries & post content' },
    { value: 'ADMIN', label: 'Admin', icon: '🛡️', desc: 'Full platform management' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-2/5 gradient-green flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-5 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center text-white">
          <div className="text-5xl mb-5">🌱</div>
          <h2 className="text-2xl font-extrabold mb-3">Join Farmers Buddy</h2>
          <p className="text-green-100 text-sm leading-relaxed max-w-xs mx-auto">
            Be part of India's largest agricultural support network.
          </p>
          <div className="mt-8 space-y-3 text-left">
            {['Connect with expert officers', 'Real-time mandi prices', 'Crop recommendations', 'Free training programs'].map(t => (
              <div key={t} className="flex items-center gap-2.5 text-sm text-white">
                <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center text-xs">✓</div>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <div className="text-center mb-6">
            <div className="inline-flex w-12 h-12 gradient-green rounded-2xl items-center justify-center text-white text-2xl mb-3 shadow-lg">🌾</div>
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="text-slate-500 text-sm mt-1">Join Farmers Buddy today — it's free</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">I am a...</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map(r => (
                    <button key={r.value} type="button" onClick={() => setForm(prev => ({ ...prev, role: r.value }))}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center ${
                        form.role === r.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                      }`}>
                      <span className="text-xl mb-1">{r.icon}</span>
                      <span className="text-xs font-bold text-slate-700">{r.label}</span>
                      <span className="text-xs text-slate-400 mt-0.5 leading-tight">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Username row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input value={form.fullName} onChange={f('fullName')} className="input-field" placeholder="Ravi Kumar" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username *</label>
                  <input value={form.username} onChange={f('username')} className="input-field" placeholder="ravi_kumar" required minLength={3} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={f('email')} className="input-field" placeholder="ravi@example.com" required />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password *</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={f('password')}
                    className="input-field pr-11" placeholder="Min. 6 characters" required minLength={6} />
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPwd ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <input value={form.phoneNumber} onChange={f('phoneNumber')} className="input-field" placeholder="9876543210" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;