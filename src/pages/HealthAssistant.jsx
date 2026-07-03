import { useState } from "react";
import OpenAI from "openai";
import { Brain, Send, Sparkles } from "lucide-react";

export default function HealthAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Explain high cholesterol.",
    "How can I improve my sleep?",
    "Healthy diet for weight loss?",
    "What does high blood pressure mean?",
  ];

  const askAI = async (prompt = question) => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const client = new OpenAI({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true,
      });

      const completion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are LifeVault AI, a healthcare assistant. Explain medical topics in simple language, avoid definitive diagnoses, and always recommend consulting a qualified healthcare professional.",
          },
          ...messages,
          userMessage,
        ],
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: completion.choices[0].message.content,
        },
      ]);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex items-center gap-4">
            <Brain size={46}/>
            <div>
              <h1 className="text-4xl font-bold">LifeVault AI Health Assistant</h1>
              <p className="mt-2 opacity-90">
                Ask health and wellness questions in simple language.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Sparkles size={22}/> Quick Questions
          </h2>

          <div className="flex flex-wrap gap-3">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => askAI(q)}
                className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-xl"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg h-[500px] overflow-y-auto p-6">
          {messages.length === 0 ? (
            <p className="text-gray-500">
              Start a conversation with your AI health assistant.
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-5 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="text-purple-600 font-semibold">
              AI is thinking...
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <input
            className="flex-1 border rounded-2xl p-4"
            placeholder="Ask anything about your health..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askAI()}
          />

          <button
            onClick={() => askAI()}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 rounded-2xl flex items-center gap-2"
          >
            <Send size={18}/>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-2xl p-4 text-sm">
          <strong>Disclaimer:</strong> Responses are for educational purposes
          only and should not replace professional medical advice.
        </div>
      </div>
    </div>
  );
}
