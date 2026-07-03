import { useState } from "react";
import { supabase } from "../utils/supabaseclient";
import QRCode from "react-qr-code";

export default function EmergencyCard() {
  const [formData, setFormData] = useState({
    full_name: "",
    blood_group: "",
    dob: "",
    allergies: "",
    medical_conditions: "",
    current_medications: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
  });

  const [savedCard, setSavedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveCard = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("emergency_cards")
      .insert([formData])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSavedCard(data);
    alert("Emergency card saved successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-red-600 mb-2">
          🚑 Emergency Medical Card
        </h1>
        <p className="text-gray-500 mb-8">
          Create a secure emergency profile that can be accessed through a QR code.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Patient Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input className="border rounded-xl p-3" name="full_name" placeholder="Full Name" onChange={handleChange}/>
              <input className="border rounded-xl p-3" name="dob" type="date" onChange={handleChange}/>

              <select className="border rounded-xl p-3" name="blood_group" onChange={handleChange}>
                <option value="">Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>

              <input className="border rounded-xl p-3" name="allergies" placeholder="Allergies" onChange={handleChange}/>
              <input className="border rounded-xl p-3" name="medical_conditions" placeholder="Medical Conditions" onChange={handleChange}/>
              <input className="border rounded-xl p-3" name="current_medications" placeholder="Current Medications" onChange={handleChange}/>
              <input className="border rounded-xl p-3 md:col-span-2" name="address" placeholder="Address" onChange={handleChange}/>
              <input className="border rounded-xl p-3" name="emergency_contact_name" placeholder="Emergency Contact" onChange={handleChange}/>
              <input className="border rounded-xl p-3" name="emergency_contact_number" placeholder="Emergency Phone" onChange={handleChange}/>
            </div>

            <button
              onClick={saveCard}
              disabled={loading}
              className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-semibold">
              {loading ? "Saving..." : "💾 Save Emergency Card"}
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Emergency ID Preview</h2>

            {savedCard ? (
              <>
                <div className="bg-red-600 text-white rounded-2xl p-6">
                  <h3 className="text-3xl font-bold">{savedCard.full_name}</h3>
                  <span className="inline-block mt-3 bg-white text-red-600 px-4 py-2 rounded-full font-bold">
                    🩸 {savedCard.blood_group}
                  </span>

                  <div className="mt-6 space-y-3">
                    <p><b>DOB:</b> {savedCard.dob}</p>
                    <p><b>⚠️ Allergies:</b> {savedCard.allergies}</p>
                    <p><b>❤️ Conditions:</b> {savedCard.medical_conditions}</p>
                    <p><b>💊 Medications:</b> {savedCard.current_medications}</p>
                    <p><b>📍 Address:</b> {savedCard.address}</p>
                    <p><b>📞 Contact:</b> {savedCard.emergency_contact_name}</p>
                    <p><b>☎ Phone:</b> {savedCard.emergency_contact_number}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-8">
                  <QRCode value={`http://localhost:5173/emergency/${savedCard.id}`} size={180}/>
                  <p className="mt-4 text-gray-500 text-center">
                    Scan to access emergency medical information.
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-lg">
                Save the form to generate your emergency card.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
