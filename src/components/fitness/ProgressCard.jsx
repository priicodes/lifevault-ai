import { motion } from "framer-motion";

export default function ProgressCard({
  title,
  value,
  goal,
  unit,
  color,
  icon,
}) {
  const percentage = Math.min(
    Math.round((value / goal) * 100),
    100
  );

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="bg-white rounded-3xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center">

        <div>

          <div className="flex items-center gap-3">

            <div
              className="text-3xl"
              style={{ color }}
            >
              {icon}
            </div>

            <div>

              <p className="text-gray-500">
                {title}
              </p>

              <h2 className="text-3xl font-bold">
                {value}
                <span className="text-lg ml-1">
                  {unit}
                </span>
              </h2>

            </div>

          </div>

        </div>

        <div className="text-right">

          <p className="text-gray-400 text-sm">
            Goal
          </p>

          <p className="font-semibold">
            {goal} {unit}
          </p>

        </div>

      </div>

      <div className="mt-5">

        <div className="w-full bg-gray-200 h-3 rounded-full">

          <div
            className="h-3 rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />

        </div>

        <div className="flex justify-between mt-2">

          <span className="text-sm text-gray-500">
            {percentage}% Completed
          </span>

          {percentage === 100 && (
            <span className="text-green-600 font-semibold">
              🎉 Goal Reached
            </span>
          )}

        </div>

      </div>

    </motion.div>
  );
}