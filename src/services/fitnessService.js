import { supabase } from "../utils/supabaseclient";

/* ===========================
   Weekly Fitness
=========================== */

export async function getWeeklyFitness() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const today = new Date();

  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6);

  const { data, error } = await supabase
    .from("fitness_tracker")
    .select("*")
    .eq("profile_id", user.id)
    .gte(
      "created_at",
      lastWeek.toISOString().split("T")[0]
    )
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

/* ===========================
   Today's Fitness
=========================== */

export async function getTodayFitness() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("fitness_tracker")
    .select("*")
    .eq("profile_id", user.id)
    .eq("created_at", today)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/* ===========================
   Achievement System
=========================== */

export async function getFitnessAchievements() {
  const today = await getTodayFitness();

  if (!today) {
    return {
      healthScore: 0,
      achievements: [],
    };
  }

  const stepScore = Math.min(
    (today.steps / 10000) * 30,
    30
  );

  const waterScore = Math.min(
    (today.water_intake / 3) * 20,
    20
  );

  const sleepScore = Math.min(
    (today.sleep_hours / 8) * 20,
    20
  );

  const exerciseScore = Math.min(
    (today.exercise_minutes / 30) * 30,
    30
  );

  const healthScore = Math.round(
    stepScore +
      waterScore +
      sleepScore +
      exerciseScore
  );

  return {
    healthScore,

    achievements: [
      {
        title: "First 10K Steps",
        progress: Math.min(
          Math.round(
            (today.steps / 10000) * 100
          ),
          100
        ),
        status:
          today.steps >= 10000
            ? "Unlocked"
            : `${today.steps}/10000 Steps`,
      },

      {
        title: "Hydration Hero",
        progress: Math.min(
          Math.round(
            (today.water_intake / 3) * 100
          ),
          100
        ),
        status:
          today.water_intake >= 3
            ? "Unlocked"
            : `${today.water_intake}L / 3L`,
      },

      {
        title: "Sleep Master",
        progress: Math.min(
          Math.round(
            (today.sleep_hours / 8) * 100
          ),
          100
        ),
        status:
          today.sleep_hours >= 8
            ? "Unlocked"
            : `${today.sleep_hours}/8 hrs`,
      },

      {
        title: "Fitness Champion",
        progress: Math.min(
          Math.round(
            (today.exercise_minutes / 30) * 100
          ),
          100
        ),
        status:
          today.exercise_minutes >= 30
            ? "Unlocked"
            : `${today.exercise_minutes}/30 min`,
      },
    ],
  };
}