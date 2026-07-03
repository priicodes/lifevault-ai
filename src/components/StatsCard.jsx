export default function StatsCard({
  title,
  value,
  icon,
  color = "from-cyan-500 to-blue-600",
}) {
  return (
    <div
      className={`bg-gradient-to-r ${color} rounded-2xl shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </div>
  );
}