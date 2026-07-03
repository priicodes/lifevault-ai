import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseclient";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("profile_id", user.id)
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setDocuments(data);
    }

    setLoading(false);
  };

  const deleteDocument = async (doc) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      const filePath = doc.file_url.split("/documents/")[1];

      if (filePath) {
        await supabase.storage
          .from("documents")
          .remove([filePath]);
      }

      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", doc.id);

      if (error) {
        alert(error.message);
        return;
      }

      fetchDocuments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Medical Documents
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">
            No documents uploaded yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  Document Name
                </th>
                <th className="text-left p-4">
                  Category
                </th>
                <th className="text-left p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {doc.document_name}
                  </td>

                  <td className="p-4">
                    {doc.document_type}
                  </td>

                  <td className="p-4 flex gap-3">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      View
                    </a>

                    <button
                      onClick={() => deleteDocument(doc)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}