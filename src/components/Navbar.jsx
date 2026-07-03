import { Bell, Search, UserCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md border-b border-gray-200 px-8 py-4 flex justify-between items-center"
    >
      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-600">
          ❤️ LifeVault AI
        </h1>

        <p className="text-sm text-gray-500">
          {today}
        </p>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search documents, reports..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        <button className="relative hover:text-cyan-600 transition">
          <Bell size={24} />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={36} className="text-cyan-600" />

          <div className="hidden md:block">
            <p className="font-semibold">
              Welcome
            </p>

            <p className="text-xs text-gray-500">
              LifeVault User
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition">
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </motion.nav>
  );
}