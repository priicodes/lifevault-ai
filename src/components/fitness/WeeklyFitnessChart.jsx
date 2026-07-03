import { useEffect, useState } from "react";
import { getWeeklyFitness } from "../../services/fitnessService";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WeeklyFitnessChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    const data = await getWeeklyFitness();

    if (!data || data.length === 0) {
      setChartData([
        { day: "Mon", steps: 0 },
        { day: "Tue", steps: 0 },
        { day: "Wed", steps: 0 },
        { day: "Thu", steps: 0 },
        { day: "Fri", steps: 0 },
        { day: "Sat", steps: 0 },
        { day: "Sun", steps: 0 },
      ]);
      return;
    }

    const formatted = data.map((item) => ({
      day: new Date(item.created_at).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      steps: item.steps || 0,
    }));

    setChartData(formatted);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        📈 Weekly Activity
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="steps"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}