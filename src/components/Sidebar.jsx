import {
  LayoutDashboard,
  FileText,
  Brain,
  MessageCircleHeart,
  Activity,
  CalendarDays,
  ShieldAlert,
  Users,
  User,
  Settings,
  LogOut,
  Trophy,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Documents", path: "/documents", icon: FileText },
    { name: "AI Analyzer", path: "/ai-analyzer", icon: Brain },
    { name: "AI Assistant", path: "/health-assistant", icon: MessageCircleHeart },
    { name: "Fitness", path: "/fitness", icon: Activity },
    { name: "Timeline", path: "/health-timeline", icon: CalendarDays },
    { name: "Emergency", path: "/emergency-card", icon: ShieldAlert },
    { name: "Family", path: "/family-access", icon: Users },
    { name: "Achievements", path: "/achievements", icon: Trophy },
  ];

  return (
    <motion.aside
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-72 bg-slate-900 text-white min-h-screen flex flex-col justify-between shadow-2xl"
    >
      <div>
        <div className="p-8 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-cyan-400">
            ❤️ LifeVault AI
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            AI Powered Healthcare
          </p>
        </div>

        <nav className="mt-8 space-y-2 px-3">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-cyan-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`}
              >
                <Icon size={22} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-700 p-5">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
          <User size={20} />
          Profile
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
          <Settings size={20} />
          Settings
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500 hover:bg-red-600 mt-4 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
}
