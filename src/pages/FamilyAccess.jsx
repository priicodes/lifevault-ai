import { useState } from "react";
import { supabase } from "../utils/supabaseclient";
import { Users, Mail, ShieldCheck, Trash2 } from "lucide-react";

export default function FamilyAccess() {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [familyEmail, setFamilyEmail] = useState("");
  const [relation, setRelation] = useState("");
  const [accessLevel, setAccessLevel] = useState("Emergency Only");
  const [members, setMembers] = useState([]);

  const addFamilyMember = async () => {
    if (!ownerEmail || !familyEmail || !relation) {
      alert("Please fill all fields.");
      return;
    }

    const newMember = {
      owner_email: ownerEmail,
      family_email: familyEmail,
      relation,
      access_level: accessLevel,
      status: "Active",
    };

    const { error } = await supabase
      .from("family_access")
      .insert([newMember]);

    if (error) {
      alert(error.message);
      return;
    }

    setMembers((prev) => [...prev, newMember]);

    setFamilyEmail("");
    setRelation("");
    setAccessLevel("Emergency Only");

    alert("Family member added successfully!");
  };

  const removeMember = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl text-white p-8 mb-8">
          <div className="flex items-center gap-4">
            <Users size={46} />
            <div>
              <h1 className="text-4xl font-bold">Family Access</h1>
              <p className="mt-2 opacity-90">
                Give trusted family members secure access during emergencies.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Invite Family Member</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border rounded-xl p-3"
              placeholder="Your Email"
              value={ownerEmail}
              onChange={(e)=>setOwnerEmail(e.target.value)}
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Family Member Email"
              value={familyEmail}
              onChange={(e)=>setFamilyEmail(e.target.value)}
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Relationship"
              value={relation}
              onChange={(e)=>setRelation(e.target.value)}
            />

            <select
              className="border rounded-xl p-3"
              value={accessLevel}
              onChange={(e)=>setAccessLevel(e.target.value)}
            >
              <option>Emergency Only</option>
              <option>Read Only</option>
              <option>Full Access</option>
            </select>
          </div>

          <button
            onClick={addFamilyMember}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Invite Family Member
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Connected Members</h2>

          {members.length === 0 ? (
            <p className="text-gray-500">No family members added yet.</p>
          ) : (
            <div className="space-y-4">
              {members.map((m, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-5 flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2 font-semibold">
                      <Mail size={18} />
                      {m.family_email}
                    </div>

                    <p className="text-gray-600 mt-2">
                      ❤️ {m.relation}
                    </p>

                    <p className="text-sm mt-1 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-600"/>
                      {m.access_level}
                    </p>

                    <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {m.status}
                    </span>
                  </div>

                  <button
                    onClick={() => removeMember(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
