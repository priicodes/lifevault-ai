import { HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export default function HealthScoreCard({
  steps = 0,
  water = 0,
  sleep = 0,
  exercise = 0,
}) {
  const stepScore = Math.min((steps / 10000) * 30, 30);
  const waterScore = Math.min((water / 3) * 20, 20);
  const sleepScore = Math.min((sleep / 8) * 20, 20);
  const exerciseScore = Math.min((exercise / 30) * 30, 30);

  const totalScore = Math.round(
    stepScore + waterScore + sleepScore + exerciseScore
  );

  let status = "Needs Improvement";

  if (totalScore >= 85) status = "Excellent";
  else if (totalScore >= 70) status = "Good";
  else if (totalScore >= 50) status = "Average";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl shadow-xl text-white p-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg opacity-90">
            Health Score
          </p>

          <h1 className="text-6xl font-bold mt-2">
            {totalScore}
          </h1>

          <p className="mt-3 text-lg">
            {status}
          </p>
        </div>

        <div className="bg-white/20 rounded-full p-5">
          <HeartPulse size={70} />
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">

          <div
            className="bg-white h-4 rounded-full"
            style={{
              width: `${totalScore}%`,
            }}
          />

        </div>

        <p className="mt-3 text-sm opacity-90">
          Your score is calculated using
          steps, water intake, sleep,
          and exercise.
        </p>
      </div>
    </motion.div>
  );
}