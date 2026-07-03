import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseclient";

import HealthScoreCard from "../components/fitness/HealthScoreCard";
import ProgressCard from "../components/fitness/ProgressCard";
import WeeklyFitnessChart from "../components/fitness/WeeklyFitnessChart";
import GoalTracker from "../components/fitness/GoalTracker";
import GoogleFitCard from "../components/fitness/GoogleFitCard";
import AIFitnessCoach from "../components/fitness/AIFitnessCoach";

export default function FitnessTracker() {
  const [loading, setLoading] = useState(false);

  const [fitness, setFitness] = useState({
    steps: 0,
    water_intake: 0,
    sleep_hours: 0,
    calories: 0,
    weight: 0,
    exercise_minutes: 0,
  });

  useEffect(() => {
    loadTodayData();
  }, []);

  const loadTodayData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("fitness_tracker")
        .select("*")
        .eq("profile_id", user.id)
        .eq("created_at", today)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setFitness({
          steps: data.steps ?? 0,
          water_intake: data.water_intake ?? 0,
          sleep_hours: data.sleep_hours ?? 0,
          calories: data.calories ?? 0,
          weight: data.weight ?? 0,
          exercise_minutes: data.exercise_minutes ?? 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateField = (field, value) => {
    setFitness((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const saveFitness = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      const { error } = await supabase
        .from("fitness_tracker")
        .upsert({
          profile_id: user.id,
          created_at: today,
          ...fitness,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Fitness data saved successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">

        <h1 className="text-5xl font-bold">
          🏃 Smart Fitness Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Track your health and improve every day.
        </p>

      </div>

      <HealthScoreCard
        steps={fitness.steps}
        water={fitness.water_intake}
        sleep={fitness.sleep_hours}
        exercise={fitness.exercise_minutes}
      />

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <ProgressCard
          title="Steps"
          value={fitness.steps}
          goal={10000}
          unit=""
          color="#06b6d4"
          icon="👣"
        />

        <ProgressCard
          title="Water Intake"
          value={fitness.water_intake}
          goal={3}
          unit="L"
          color="#3b82f6"
          icon="💧"
        />

        <ProgressCard
          title="Sleep"
          value={fitness.sleep_hours}
          goal={8}
          unit="hrs"
          color="#8b5cf6"
          icon="😴"
        />

        <ProgressCard
          title="Exercise"
          value={fitness.exercise_minutes}
          goal={30}
          unit="min"
          color="#16a34a"
          icon="🏋️"
        />
      </div>
       {/* Weekly Chart */}

      <div className="mt-10">
        <WeeklyFitnessChart />
      </div>

      {/* Goals + AI */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <GoalTracker
          steps={fitness.steps}
          water={fitness.water_intake}
          sleep={fitness.sleep_hours}
          exercise={fitness.exercise_minutes}
        />

        <AIFitnessCoach
          steps={fitness.steps}
          water={fitness.water_intake}
          sleep={fitness.sleep_hours}
        />

      </div>

      {/* Google Fit */}

      <div className="mt-10">
        <GoogleFitCard />
      </div>

      {/* Input Form */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Update Today's Fitness
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              👣 Steps
            </label>

            <input
              type="number"
              value={fitness.steps}
              onChange={(e) =>
                updateField("steps", e.target.value)
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              💧 Water Intake (L)
            </label>

            <input
              type="number"
              step="0.1"
              value={fitness.water_intake}
              onChange={(e) =>
                updateField(
                  "water_intake",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              😴 Sleep Hours
            </label>

            <input
              type="number"
              step="0.5"
              value={fitness.sleep_hours}
              onChange={(e) =>
                updateField(
                  "sleep_hours",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              🔥 Calories
            </label>

            <input
              type="number"
              value={fitness.calories}
              onChange={(e) =>
                updateField(
                  "calories",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              ⚖ Weight (kg)
            </label>

            <input
              type="number"
              step="0.1"
              value={fitness.weight}
              onChange={(e) =>
                updateField(
                  "weight",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              🏋 Exercise Minutes
            </label>

            <input
              type="number"
              value={fitness.exercise_minutes}
              onChange={(e) =>
                updateField(
                  "exercise_minutes",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

        </div>
                <div className="mt-8 flex justify-end">

          <button
            onClick={saveFitness}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Saving..." : "💾 Save Fitness Data"}
          </button>

        </div>

      </div>

    </div>
  );
}
