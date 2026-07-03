import { useEffect, useState } from "react";
import {
  Trophy,
  Droplets,
  Footprints,
  Moon,
  Dumbbell,
  Award,
} from "lucide-react";

import { getFitnessAchievements } from "../services/fitnessService";

export default function Achievements() {
  const [healthScore, setHealthScore] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const data = await getFitnessAchievements();
    setHealthScore(data.healthScore);
    setAchievements(data.achievements);
  };

  const icons = {
    "First 10K Steps": <Footprints className="text-cyan-600" size={30} />,
    "Hydration Hero": <Droplets className="text-blue-600" size={30} />,
    "Sleep Master": <Moon className="text-indigo-600" size={30} />,
    "Fitness Champion": <Dumbbell className="text-green-600" size={30} />,
  };

  const unlocked = achievements.filter(
    (a) => a.status === "Unlocked"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl shadow-xl text-white p-8 mb-8">
          <div className="flex items-center gap-4">
            <Trophy size={50} />
            <div>
              <h1 className="text-4xl font-bold">
                Achievements & Streaks
              </h1>
              <p className="mt-2 opacity-90">
                Unlock milestones by maintaining healthy habits.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <p className="text-gray-500">Health Score</p>
            <h2 className="text-6xl font-bold text-green-600 mt-2">
              {healthScore}
            </h2>

            <div className="mt-5 h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 bg-green-500 rounded-full"
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-between">
            <div>
              <p className="text-gray-500">Achievements Unlocked</p>
              <h2 className="text-5xl font-bold mt-2">
                {unlocked}/{achievements.length}
              </h2>
            </div>

            <Award className="text-amber-500" size={60} />
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                {icons[item.title]}
                <div>
                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">
                    {item.status}
                  </p>
                </div>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-cyan-600 rounded-full"
                  style={{
                    width: `${item.progress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {item.progress}% Complete
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
