import { useState } from "react";
import { supabase } from "../utils/supabaseclient";
import { saveDocument } from "../services/documentService";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, file);

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

      await saveDocument(
        file.name,
        publicUrl,
        "Medical Report"
      );

      alert("Document Uploaded Successfully");

      setFile(null);
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Upload Medical Document
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        disabled={loading}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}