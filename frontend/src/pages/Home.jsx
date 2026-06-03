// =============================================================
// Home.jsx — Public Landing Page (Enhanced)
// =============================================================
// Sections: Hero | Features | How It Works | Testimonial strip | Footer
// - Hero: full-height farming background with overlay + CTA
// - Features: 4 cards with colored icon backgrounds
// - How It Works: numbered steps
// - Footer: richer branding
// =============================================================

import { Link, useNavigate } from "react-router-dom"
import { FaLeaf, FaUsers, FaComments, FaChartLine, FaShieldAlt, FaMobileAlt } from "react-icons/fa"
import { GiWheat, GiPlantRoots } from "react-icons/gi"

// Feature card data
const features = [
  {
    icon: <FaComments className="text-3xl text-white" />,
    bg: "bg-green-600",
    title: "Query Support",
    desc: "Submit agriculture questions and get expert guidance from certified officers.",
  },
  {
    icon: <FaUsers className="text-3xl text-white" />,
    bg: "bg-amber-500",
    title: "Officer Assistance",
    desc: "Agriculture officers review and resolve farmer queries with professional advice.",
  },
  {
    icon: <FaLeaf className="text-3xl text-white" />,
    bg: "bg-emerald-600",
    title: "Smart Farming",
    desc: "Get crop recommendations, soil analysis tools, and modern farming practices.",
  },
  {
    icon: <FaChartLine className="text-3xl text-white" />,
    bg: "bg-teal-600",
    title: "Workflow Tracking",
    desc: "Track query status — from submission through officer response — in real time.",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-white" />,
    bg: "bg-blue-600",
    title: "Scheme Awareness",
    desc: "Stay informed about government schemes, loans, and farmer welfare programs.",
  },
  {
    icon: <FaMobileAlt className="text-3xl text-white" />,
    bg: "bg-purple-600",
    title: "Community Forum",
    desc: "Connect with fellow farmers, share experiences, and learn from peers.",
  },
]

// Workflow steps
const steps = [
  { num: "01", emoji: "🌱", title: "Farmer Raises Query", desc: "Farmers submit agriculture issues with a title and detailed description." },
  { num: "02", emoji: "👨‍🌾", title: "Officer Reviews",    desc: "Certified officers analyze and respond to queries from their dashboard." },
  { num: "03", emoji: "✅", title: "Problem Solved",      desc: "Farmers receive expert guidance and the query is marked as resolved." },
]

function Home() {

  const navigate = useNavigate()

  const handleGetStarted = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) { navigate("/register"); return }
    if (user.role === "FARMER")       navigate("/farmer-dashboard")
    else if (user.role === "OFFICER") navigate("/officer-dashboard")
    else if (user.role === "ADMIN")   navigate("/admin-dashboard")
    else if (user.role === "EXPERT")  navigate("/expert-dashboard")
    else navigate("/register")
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================================================ */}
      {/* HERO SECTION                                                      */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background farming image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/80 to-green-800/60" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* Left: text + CTA */}
          <div>
            {/* Tag line */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm px-4 py-1.5 rounded-full mb-6">
              <GiWheat />
              Agriculture Support Platform
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Smart Farming
              <br />
              <span className="text-amber-400">Starts Here</span>
            </h1>

            <p className="mt-6 text-lg text-green-100 leading-relaxed max-w-lg">
              Farmers Buddy connects farmers directly with agriculture officers
              for expert guidance, query management, and modern farming support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handleGetStarted}
                className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-amber-500/30"
              >
                Get Started Free
              </button>

              <Link
                to="/login"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg transition backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="mt-12 flex gap-8">
              {[["500+", "Farmers"], ["50+", "Officers"], ["1000+", "Queries Solved"]].map(([num, lbl]) => (
                <div key={lbl}>
                  <p className="text-2xl font-extrabold text-amber-400">{num}</p>
                  <p className="text-green-300 text-sm">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating info card */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl max-w-sm w-full">
              <GiPlantRoots className="text-6xl text-amber-400 mx-auto mb-4" />
              <h3 className="text-white text-2xl font-bold text-center mb-4">
                Empowering Farmers
              </h3>
              <ul className="space-y-3 text-green-100 text-sm">
                {[
                  "Direct access to agriculture experts",
                  "Role-based secure dashboards",
                  "Query tracking from submission to resolution",
                  "Crop recommendations & soil analysis",
                  "Government scheme awareness",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURES SECTION                                                  */}
      {/* ================================================================ */}
      <section className="py-24 px-8 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900">
              Everything Farmers Need
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              A complete agriculture support platform built to bridge the gap
              between farmers and certified agriculture officers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-green-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg"
              >
                {/* Icon circle */}
                <div className={`${feat.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                  {feat.icon}
                </div>

                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {feat.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW IT WORKS SECTION                                              */}
      {/* ================================================================ */}
      <section className="py-24 px-8 bg-gradient-to-br from-green-50 to-amber-50">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900">How It Works</h2>
            <p className="text-gray-500 mt-3">
              Three simple steps to get expert agriculture support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">

            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-300 to-amber-300" />

            {steps.map((step) => (
              <div key={step.num} className="text-center relative">

                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-700 text-white text-2xl rounded-2xl shadow-lg mx-auto mb-4">
                  {step.emoji}
                </div>

                <div className="text-xs font-bold text-amber-600 mb-1 tracking-widest">
                  STEP {step.num}
                </div>

                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA BANNER                                                        */}
      {/* ================================================================ */}
      <section className="py-20 px-8 bg-gradient-to-r from-green-800 to-green-700 text-white text-center">

        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Transform Farming?
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of farmers getting expert agriculture support through Farmers Buddy.
        </p>

        <Link
          to="/register"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-2xl font-bold text-lg transition shadow-xl shadow-amber-700/40"
        >
          Create Free Account
        </Link>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                            */}
      {/* ================================================================ */}
      <footer className="bg-green-950 text-white py-12 px-8">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-xl">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">
                Farmers <span className="text-amber-400">Buddy</span>
              </h2>
              <p className="text-green-400 text-xs">Empowering Farmers Through Technology</p>
            </div>
          </div>

          <div className="flex gap-8 text-sm text-green-300">
            <Link to="/"         className="hover:text-white transition">Home</Link>
            <Link to="/login"    className="hover:text-white transition">Login</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>

          <p className="text-green-500 text-xs">
            © 2025 Farmers Buddy. Final Year Project.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default Home
