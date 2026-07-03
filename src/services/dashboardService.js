import { supabase } from "../utils/supabaseclient";

export const getDashboardStats = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("profile_id", user.id);

  return {
    totalDocuments: documents?.length || 0,
  };
};