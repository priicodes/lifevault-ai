import { CheckCircle2, Circle } from "lucide-react";

export default function GoalTracker({
  steps = 0,
  water = 0,
  sleep = 0,
  exercise = 0,
}) {
  const goals = [
    {
      title: "Walk 10,000 Steps",
      completed: steps >= 10000,
    },
    {
      title: "Drink 3L Water",
      completed: water >= 3,
    },
    {
      title: "Sleep 8 Hours",
      completed: sleep >= 8,
    },
    {
      title: "Exercise 30 Minutes",
      completed: exercise >= 30,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        🎯 Daily Goals
      </h2>

      <div className="space-y-5">

        {goals.map((goal, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            {goal.completed ? (
              <CheckCircle2
                size={28}
                className="text-green-600"
              />
            ) : (
              <Circle
                size={28}
                className="text-gray-400"
              />
            )}

            <span
              className={`text-lg ${
                goal.completed
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {goal.title}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}