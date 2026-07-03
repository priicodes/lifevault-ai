import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseclient";
import { Phone, HeartPulse, AlertTriangle, ShieldPlus } from "lucide-react";

export default function PublicEmergency() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const { data, error } = await supabase
        .from("emergency_cards")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setCard(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Emergency Information...
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl font-bold">
        Emergency card not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <ShieldPlus size={48} />
            <div>
              <h1 className="text-4xl font-bold">Emergency Medical Profile</h1>
              <p className="opacity-90 mt-2">
                Critical information for first responders.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">

          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold">{card.full_name}</h2>
              <p className="text-gray-500">Date of Birth: {card.dob}</p>
            </div>

            <span className="bg-red-100 text-red-700 px-5 py-2 rounded-full font-bold text-xl">
              {card.blood_group}
            </span>
          </div>

          <div className="flex gap-4">
            <AlertTriangle className="text-orange-500 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Allergies</h3>
              <p>{card.allergies || "None Reported"}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <HeartPulse className="text-red-500 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Medical Conditions</h3>
              <p>{card.medical_conditions || "None Reported"}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="text-green-600 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Emergency Contact</h3>
              <p>{card.emergency_contact_name}</p>
              <a
                href={`tel:${card.emergency_contact_number}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {card.emergency_contact_number}
              </a>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h3 className="font-bold text-red-700 mb-2">Emergency Notice</h3>
            <p>
              If this person is unconscious or needs urgent medical attention,
              contact the emergency contact immediately and share this medical
              information with healthcare professionals.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
