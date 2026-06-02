// =============================================================
// Home.jsx — Public Landing Page
// =============================================================
// The first page visitors see when they open Farmers Buddy.
// Contains three main sections:
//   1. Hero Section   — headline, description, CTA buttons (Get Started / Login)
//   2. Features Section — 4 feature highlight cards with icons
//   3. How It Works   — 3-step workflow (Farmer Raises Query → Officer Reviews → Solved)
//   4. Footer         — brand tagline
//
// This page is fully static — no API calls, no state management.
// =============================================================

import { Link } from "react-router-dom"

import {
  FaLeaf,
  FaUsers,
  FaComments,
  FaChartLine
} from "react-icons/fa"

function Home() {

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ----------------------------- */}
      {/* Hero Section                  */}
      {/* ----------------------------- */}
      {/* Full-width banner with headline, description, and action buttons */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-24 px-8">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-6xl font-extrabold leading-tight">

              Smart Farming
              <br />
              Starts Here 🌾

            </h1>

            <p className="mt-8 text-xl text-green-100 leading-relaxed">

              Farmers Buddy connects farmers with agriculture officers
              for expert guidance, query management, and smart farming support.

            </p>

            {/* Call-to-action buttons */}
            <div className="mt-10 flex gap-5">

              <Link
                to="/register"
                className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-100 transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border-2 border-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-700 transition"
              >
                Login
              </Link>

            </div>

          </div>

          {/* Hero image */}
          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
              alt="Farming"
              className="rounded-3xl shadow-2xl w-full max-w-xl object-cover"
            />

          </div>

        </div>
      </section>

      {/* ----------------------------- */}
      {/* Features Section              */}
      {/* ----------------------------- */}
      {/* 4 feature cards highlighting the platform's capabilities */}
      <section className="py-24 px-8">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center text-green-700 mb-16">
            Our Features
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {/* Feature: Query Support */}
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:scale-105 transition">

              <FaComments className="text-6xl text-green-600 mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">
                Query Support
              </h3>

              <p className="text-gray-600">
                Farmers can ask agriculture-related questions directly.
              </p>

            </div>

            {/* Feature: Officer Assistance */}
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:scale-105 transition">

              <FaUsers className="text-6xl text-green-600 mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">
                Officer Assistance
              </h3>

              <p className="text-gray-600">
                Agriculture officers can resolve farmer queries quickly.
              </p>

            </div>

            {/* Feature: Smart Farming */}
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:scale-105 transition">

              <FaLeaf className="text-6xl text-green-600 mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">
                Smart Farming
              </h3>

              <p className="text-gray-600">
                Promote efficient and modern farming practices.
              </p>

            </div>

            {/* Feature: Workflow Tracking */}
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:scale-105 transition">

              <FaChartLine className="text-6xl text-green-600 mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">
                Workflow Tracking
              </h3>

              <p className="text-gray-600">
                Track query status and officer responses easily.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------- */}
      {/* How It Works Section          */}
      {/* ----------------------------- */}
      {/* Visual 3-step explanation of the platform's core workflow */}
      <section className="bg-white py-24 px-8">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-5xl font-bold text-green-700 mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Step 1: Farmer raises query */}
            <div className="bg-green-50 p-10 rounded-3xl shadow">

              <div className="text-6xl mb-6">
                🌱
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Farmer Raises Query
              </h3>

              <p className="text-gray-600">
                Farmers submit issues related to crops and farming.
              </p>

            </div>

            {/* Step 2: Officer reviews */}
            <div className="bg-green-50 p-10 rounded-3xl shadow">

              <div className="text-6xl mb-6">
                👨‍🌾
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Officer Reviews
              </h3>

              <p className="text-gray-600">
                Agriculture officers analyze and respond to queries.
              </p>

            </div>

            {/* Step 3: Problem resolved */}
            <div className="bg-green-50 p-10 rounded-3xl shadow">

              <div className="text-6xl mb-6">
                ✅
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Problem Solved
              </h3>

              <p className="text-gray-600">
                Farmers receive expert guidance and solutions.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------- */}
      {/* Footer                        */}
      {/* ----------------------------- */}
      <footer className="bg-green-800 text-white py-8 text-center">

        <h2 className="text-3xl font-bold">
          Farmers Buddy 🌾
        </h2>

        <p className="mt-4 text-green-100">
          Empowering Farmers Through Technology
        </p>

      </footer>

    </div>
  )
}

export default Home
