import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseclient";
import { CalendarDays, PlusCircle, Activity } from "lucide-react";

export default function HealthTimeline() {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [eventDate,setEventDate]=useState("");
  const [events,setEvents]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{loadEvents();},[]);

  async function loadEvents(){
    const {data,error}=await supabase
      .from("health_timeline")
      .select("*")
      .order("event_date",{ascending:false});
    if(!error) setEvents(data||[]);
  }

  async function saveEvent(){
    if(!title||!eventDate){
      alert("Please enter title and date.");
      return;
    }

    setLoading(true);

    const {error}=await supabase
      .from("health_timeline")
      .insert([{
        title,
        description,
        event_date:eventDate,
      }]);

    setLoading(false);

    if(error){
      alert(error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setEventDate("");

    loadEvents();
  }

  return(
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex items-center gap-4">
            <CalendarDays size={46}/>
            <div>
              <h1 className="text-4xl font-bold">Health Timeline</h1>
              <p className="opacity-90 mt-2">
                Keep a complete history of your medical journey.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Add Health Event</h2>

          <div className="grid gap-4">
            <input
              className="border rounded-xl p-3"
              placeholder="Event Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              className="border rounded-xl p-3"
              rows="4"
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <input
              type="date"
              className="border rounded-xl p-3"
              value={eventDate}
              onChange={(e)=>setEventDate(e.target.value)}
            />

            <button
              onClick={saveEvent}
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl py-3 flex items-center justify-center gap-2"
            >
              <PlusCircle size={20}/>
              {loading?"Saving...":"Add Event"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {events.length===0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-500">
              No health events added yet.
            </div>
          ) : (
            events.map(event=>(
              <div key={event.id} className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-cyan-600">
                <div className="flex items-start gap-4">
                  <Activity className="text-cyan-600 mt-1"/>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                    <span className="inline-block mt-4 bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-semibold">
                      {event.event_date}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
