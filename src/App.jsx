import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard
import Home from "./pages/Home";

// Documents
import Documents from "./pages/Documents";

// AI
import AIAnalyzer from "./pages/AIAnalyzer";
import HealthAssistant from "./pages/HealthAssistant";

// Fitness
import FitnessTracker from "./pages/FitnessTracker";

// Emergency
import EmergencyCard from "./pages/EmergencyCard";
import PublicEmergency from "./pages/PublicEmergency";

// Family
import FamilyAccess from "./pages/FamilyAccess";

// Timeline
import HealthTimeline from "./pages/HealthTimeline";

// Achievements
import Achievements from "./pages/Achievements";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Documents */}
        <Route path="/documents" element={<Documents />} />

        {/* AI */}
        <Route
          path="/ai-analyzer"
          element={<AIAnalyzer />}
        />

        <Route
          path="/health-assistant"
          element={<HealthAssistant />}
        />

        {/* Fitness */}
        <Route
          path="/fitness"
          element={<FitnessTracker />}
        />

        {/* Emergency */}
        <Route
          path="/emergency-card"
          element={<EmergencyCard />}
        />

        <Route
          path="/emergency/:id"
          element={<PublicEmergency />}
        />

        {/* Family */}
        <Route
          path="/family-access"
          element={<FamilyAccess />}
        />

        {/* Timeline */}
        <Route
          path="/health-timeline"
          element={<HealthTimeline />}
        />

        {/* Achievements */}
        <Route
          path="/achievements"
          element={<Achievements />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;