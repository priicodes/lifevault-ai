import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseclient";
import { getTodayFitness } from "../services/fitnessService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import UploadDocument from "../components/UploadDocument";

export default function Home() {
  const [userName, setUserName] = useState("User");

  const [documentsCount, setDocumentsCount] = useState(0);

  const [todayFitness, setTodayFitness] = useState({
    steps: 0,
    calories: 0,
    exercise_minutes: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserName(user.email.split("@")[0]);

      const { count } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("profile_id", user.id);

      setDocumentsCount(count || 0);

      const fitness = await getTodayFitness();

      if (fitness) {
        setTodayFitness({
          steps: fitness.steps || 0,
          calories: fitness.calories || 0,
          exercise_minutes:
            fitness.exercise_minutes || 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8">

          {/* Hero */}

          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white">

            <h1 className="text-5xl font-bold">
              Welcome back, {userName} 👋
            </h1>

            <p className="mt-4 text-lg opacity-90">
              Manage your health records,
              fitness progress and AI health
              insights in one secure place.
            </p>

          </div>

          {/* Dashboard Cards */}

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <StatsCard
              title="Documents"
              value={documentsCount}
              icon="📄"
              color="from-blue-500 to-cyan-600"
            />

            <StatsCard
              title="Today's Steps"
              value={todayFitness.steps}
              icon="👣"
              color="from-green-500 to-emerald-600"
            />

            <StatsCard
              title="Calories"
              value={todayFitness.calories}
              icon="🔥"
              color="from-orange-500 to-red-600"
            />

            <StatsCard
              title="Exercise"
              value={todayFitness.exercise_minutes}
              icon="🏋️"
              color="from-purple-500 to-indigo-600"
            />
                      </div>

          {/* Upload Document */}

          <div className="mt-10">
            <UploadDocument />
          </div>

          {/* Bottom Section */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* Recent Activity */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                📈 Recent Activity
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between border-b pb-3">

                  <span>📄 Documents Uploaded</span>

                  <span className="font-bold">
                    {documentsCount}
                  </span>

                </div>

                <div className="flex justify-between border-b pb-3">

                  <span>👣 Today's Steps</span>

                  <span className="font-bold text-green-600">
                    {todayFitness.steps}
                  </span>

                </div>

                <div className="flex justify-between border-b pb-3">

                  <span>🔥 Calories Burned</span>

                  <span className="font-bold text-red-600">
                    {todayFitness.calories}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>🏋 Exercise Minutes</span>

                  <span className="font-bold text-blue-600">
                    {todayFitness.exercise_minutes}
                  </span>

                </div>

              </div>

            </div>

            {/* AI Health Insights */}

            <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl shadow-lg p-8 text-white">

              <h2 className="text-2xl font-bold mb-6">
                🤖 AI Health Insights
              </h2>

              <div className="space-y-4">

                <div className="bg-white/10 rounded-xl p-4">
                  💧 Drink at least 2–3L of water daily.
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  😴 Aim for 7–8 hours of sleep every night.
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  🏃 Try to reach 10,000 steps today.
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  🥗 A balanced diet improves recovery and immunity.
                </div>

              </div>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              ⚡ Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              <button className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl p-5 transition">
                📄 Upload Report
              </button>

              <button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-5 transition">
                ❤️ Health Timeline
              </button>

              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-5 transition">
                🤖 AI Assistant
              </button>

              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl p-5 transition">
                🏃 Fitness
              </button>

            </div>
          </div>
                      {/* Footer */}

          <div className="mt-10 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} LifeVault AI •
              Secure Healthcare & Fitness Platform
            </p>
          </div>

        </main>

      </div>

    </div>
  );
}