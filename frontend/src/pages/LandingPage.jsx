import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const features = [
  { icon: '🌱', title: 'Crop Recommendations', desc: 'Get expert advice on the best crops for your region and season from agriculture officers.', color: 'from-green-50 to-emerald-50 border-green-100' },
  { icon: '💬', title: 'Query Forum', desc: 'Ask questions and get detailed answers from certified agriculture officers.', color: 'from-blue-50 to-indigo-50 border-blue-100' },
  { icon: '📊', title: 'Mandi Prices', desc: 'Check real-time market prices before selling your produce to get the best deal.', color: 'from-amber-50 to-yellow-50 border-amber-100' },
  { icon: '🎓', title: 'Training Programs', desc: 'Join government-organized workshops and training sessions to upskill.', color: 'from-purple-50 to-violet-50 border-purple-100' },
];

const roles = [
  { role: 'Farmer', icon: '👨‍🌾', color: 'border-green-200 bg-gradient-to-br from-green-50 to-white', badge: 'bg-green-100 text-green-700', perks: ['Ask queries & get expert answers', 'View live mandi prices', 'Get crop recommendations', 'Enroll in training programs'] },
  { role: 'Officer', icon: '👷', color: 'border-blue-200 bg-gradient-to-br from-blue-50 to-white', badge: 'bg-blue-100 text-blue-700', perks: ['Answer farmer queries', 'Post crop recommendations', 'Update mandi prices', 'Create training programs'] },
  { role: 'Admin', icon: '🛡️', color: 'border-purple-200 bg-gradient-to-br from-purple-50 to-white', badge: 'bg-purple-100 text-purple-700', perks: ['Manage all users', 'Full platform control', 'System analytics', 'Content moderation'] },
];

const stats = [
  { value: '10K+', label: 'Farmers Helped' },
  { value: '500+', label: 'Expert Officers' },
  { value: '50K+', label: 'Queries Answered' },
  { value: '200+', label: 'Training Programs' },
];

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashLink = () => {
    if (!isAuthenticated) return '/login';
    if (user?.role === 'ADMIN') return '/admin/dashboard';
    if (user?.role === 'OFFICER') return '/officer/dashboard';
    return '/farmer/dashboard';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-green flex items-center justify-center text-white text-base shadow-md">🌾</div>
          <span className="font-bold text-slate-800 text-lg">Farmers <span className="text-green-600">Buddy</span></span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link to={getDashLink()} className="btn-primary">Go to Dashboard <FiArrowRight size={14} /></Link>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero pt-20 pb-28 px-4 sm:px-8 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-300 rounded-full opacity-15 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium text-green-700 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Trusted by 10,000+ farmers across India
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 leading-tight">
            Empowering India's<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #16a34a, #059669)' }}>
              Farmers
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with agriculture officers, get real-time market prices, access crop recommendations, and join training programs — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary text-base py-3 px-8">
              Start for Free <FiArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-secondary text-base py-3 px-8">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-slate-800">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Everything You Need</h2>
            <p className="text-slate-500">A complete platform designed for the Indian agricultural ecosystem</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className={`bg-gradient-to-br ${f.color} rounded-2xl border p-6 card-hover`}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Built for Everyone</h2>
            <p className="text-slate-500">Role-based access tailored to your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map(r => (
              <div key={r.role} className={`rounded-2xl border-2 p-6 ${r.color} card-hover`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{r.role}</h3>
                    <span className={`badge text-xs ${r.badge}`}>{r.role} Portal</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {r.perks.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                      <FiCheck className="text-green-500 mt-0.5 shrink-0" size={14} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-8" style={{ background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Transform Indian Agriculture?</h2>
          <p className="text-green-200 mb-8">Join thousands of farmers and officers already using Farmers Buddy.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-green-700 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-base">
            Get Started Free <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-green flex items-center justify-center text-white text-xs">🌾</div>
            <span className="font-semibold text-slate-300">Farmers Buddy</span>
          </div>
          <p className="text-sm">© 2026 Farmers Buddy. Built for Indian Agriculture 🇮🇳</p>
          <div className="flex gap-4 text-sm">
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;