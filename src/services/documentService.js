import { supabase } from "../utils/supabaseclient";

export const saveDocument = async (
  fileName,
  fileUrl,
  category
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        profile_id: user.id,
        document_name: fileName,
        document_type: category,
        file_url: fileUrl,
      },
    ]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const getDocuments = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("profile_id", user.id);

  if (error) throw error;

  return data;
};