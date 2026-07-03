import { Smartphone } from "lucide-react";

export default function GoogleFitCard() {
  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            Google Fit
          </h2>

          <p className="mt-2 opacity-90">
            Sync your fitness data automatically.
          </p>

          <p className="mt-4 text-sm">
            Status:
            <span className="font-bold ml-2">
              Manual Mode
            </span>
          </p>

        </div>

        <Smartphone size={70} />

      </div>

      <button
        className="mt-6 bg-white text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
      >
        Connect Google Fit (Beta)
      </button>

    </div>
  );
}