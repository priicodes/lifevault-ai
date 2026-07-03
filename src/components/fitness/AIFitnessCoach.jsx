import { Brain, Heart, Footprints, Droplets, Moon } from "lucide-react";

export default function AIFitnessCoach({
  steps = 0,
  water = 0,
  sleep = 0,
}) {
  const tips = [];

  if (steps < 5000) {
    tips.push({
      icon: <Footprints className="text-cyan-600" size={24} />,
      title: "Increase Daily Activity",
      message: `You have walked ${steps.toLocaleString()} steps today. Aim for at least 10,000 steps. Walking another ${(10000 - steps).toLocaleString()} steps can improve heart health, stamina, and your overall fitness score.`,
    });
  } else if (steps < 10000) {
    tips.push({
      icon: <Footprints className="text-cyan-600" size={24} />,
      title: "Almost There!",
      message: `Great progress! Only ${(10000 - steps).toLocaleString()} more steps to reach today's recommended goal.`,
    });
  }

  if (water < 3) {
    tips.push({
      icon: <Droplets className="text-blue-600" size={24} />,
      title: "Stay Hydrated",
      message: `Your water intake is ${water}L today. Drink another ${(3 - water).toFixed(1)}L to stay hydrated and improve concentration, recovery, and energy.`,
    });
  }

  if (sleep < 8) {
    tips.push({
      icon: <Moon className="text-indigo-600" size={24} />,
      title: "Improve Sleep",
      message: `You slept ${sleep} hours. Try getting ${(8 - sleep).toFixed(1)} more hours tonight to improve recovery, immunity, and mental performance.`,
    });
  }

  if (
    steps >= 10000 &&
    water >= 3 &&
    sleep >= 8
  ) {
    tips.push({
      icon: <Heart className="text-green-600" size={24} />,
      title: "Excellent Work!",
      message:
        "You've achieved all your daily wellness goals. Keep maintaining this routine to build long-term healthy habits.",
    });
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-cyan-600" size={34} />

        <div>
          <h2 className="text-2xl font-bold">
            AI Fitness Coach
          </h2>

          <p className="text-gray-500 text-sm">
            Personalized recommendations based on today's activity
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
          >
            <div>
              {tip.icon}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1">
                {tip.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {tip.message}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}