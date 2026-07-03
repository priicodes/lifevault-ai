import { useState } from "react";

import { Brain, FileText, Sparkles, Copy } from "lucide-react";

export default function AIAnalyzer() {
  const [reportText, setReportText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleReport = `CBC Report
Hemoglobin: 11.5 g/dL
WBC: 11800 /µL
Platelets: 240000 /µL
Vitamin D: 18 ng/mL`;

  const analyzeReport = async () => {
    if (!reportText.trim()) {
      alert("Please enter or paste a medical report.");
      return;
    }

    try {
      setLoading(true);

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
              "You are a healthcare AI assistant. Explain reports in simple language. Never provide a definitive diagnosis. Format the response with headings: Summary, Important Findings, Possible Concerns, Easy Explanation, Health Recommendations, Doctor Advice.",
          },
          {
            role: "user",
            content: reportText,
          },
        ],
      });

      setSummary(completion.choices[0].message.content);
    } catch (err) {
      console.error(err);
      alert(err.message);
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
              <h1 className="text-4xl font-bold">AI Medical Report Analyzer</h1>
              <p className="mt-2 opacity-90">
                Upload or paste your report and receive an easy-to-understand explanation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText size={26}/> Medical Report
            </h2>

            <button
              onClick={() => setReportText(exampleReport)}
              className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-xl"
            >
              Load Example
            </button>
          </div>

          <textarea
            rows={12}
            value={reportText}
            onChange={(e)=>setReportText(e.target.value)}
            className="w-full border rounded-2xl p-4"
            placeholder="Paste your medical report here..."
          />

          <button
            onClick={analyzeReport}
            disabled={loading}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze with AI"}
          </button>

        </div>

        {summary && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-purple-600"/>
                AI Analysis
              </h2>

              <button
                onClick={() => navigator.clipboard.writeText(summary)}
                className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-xl"
              >
                <Copy size={18}/>
                Copy
              </button>
            </div>

            <div className="whitespace-pre-wrap leading-8 text-gray-700 bg-slate-50 rounded-2xl p-6">
              {summary}
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-2xl p-4">
              <strong>Medical Disclaimer</strong>
              <p className="mt-2 text-sm">
                This AI explanation is for educational purposes only and should
                not replace advice from a qualified healthcare professional.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
