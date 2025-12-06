import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ResultPage = () => {
  const location = useLocation();
  const { image } = location.state || {}; 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const analyzeProfile = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("Missing Gemini API Key in .env");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Analyze this LinkedIn profile and evaluate the reality to the best of your ability. Provide a strict JSON response with the following fields:
        {
          "score": "A strong numerical score out of 100",
          "profile_selection_score": "Text describing profile selection possibility",
          "experience_warning": "Warning about potentially fake/weak experience (if any) with brutal scolding, otherwise null or safe message",
          "project_suggestions": "List of 1-2 recommended projects based on skills/domain",
          "startup_vs_solver": "Assessment of whether they look like a startup enthusiast or problem solver",
          "summary": "Brief summary/conclusion"
        }
        Return ONLY the JSON.`;

        let result;
        if (image) {
          const base64Data = image.split(',')[1];
          const mimeType = image.split(':')[1].split(';')[0];
          
          const imagePart = {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            },
          };

          // Retry logic
          const makeRequest = async (retries = 3, delay = 1000) => {
             try {
                 return await model.generateContent([prompt, imagePart]);
             } catch (err) {
                 if (err.message.includes("429") && retries > 0) {
                     console.log(`Quota exceeded. Retrying in ${delay}ms...`);
                     await new Promise(resolve => setTimeout(resolve, delay));
                     return makeRequest(retries - 1, delay * 2);
                 }
                 throw err;
             }
          };

          result = await makeRequest();
        } else {
            throw new Error("No image provided");
        }

        const responseText = result.response.text();
        const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonString);
        setResult(data);
      } catch (err) {
        console.error("Analysis Error:", err);
        setError(err.message || "Failed to analyze profile.");
      } finally {
        setLoading(false);
      }
    };

    analyzeProfile();
  }, [image]);

  if (loading) {
     return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center font-sans">
            <h2 className="text-2xl font-bold text-blue-900 animate-pulse">Analyzing Profile...</h2>
            <p className="text-gray-500 mt-2">This may take a few seconds.</p>
        </div>
     );
  }

  if (error) {
      return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center font-sans">
             <h2 className="text-xl font-bold text-red-600">Error</h2>
             <p className="text-gray-700 mt-2">{error}</p>
             <Link to="/" className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-full">Go Back</Link>
        </div>
      );
  }

 
  if (!result) return null;

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col font-sans relative">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 w-full max-w-6xl mx-auto border-b border-gray-300 backdrop-blur-sm">
        <div className="flex items-center gap-4">
            <img src="/Linklogonew.png" alt="Linkyzer Logo" className="w-[100px] md:w-[110px] h-auto object-contain" />
        </div>
        <div>
            <Link to="/" className="text-[#3b82f6] hover:text-[#2563eb] font-medium text-sm md:text-base">Analyze another Profile</Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center pt-24 md:pt-28 px-4 pb-12">
        
        <h1 className="text-xl md:text-3xl font-medium text-slate-700 text-center mb-6 md:mb-6 max-w-2xl leading-relaxed">
          Your LinkedIn score is ready - now let’s make it stronger.
        </h1>

        <div className="bg-[#dbeafe] border border-blue-200 rounded-[20px] md:rounded-[30px] p-6 md:p-12 w-full max-w-4xl shadow-sm flex flex-col items-center">
            
            <div className="space-y-4 md:space-y-6 w-full max-w-3xl text-center mb-8 md:mb-10">
                <p className="text-[#5b5fc7] font-medium text-base md:text-lg">
                    1. Profile Selection Possibility Score: {result.score}/100 - {result.profile_selection_score}
                </p>
                <p className="text-[#5b5fc7] font-medium text-base md:text-lg">
                    2. Fake/Weak Experience: {result.experience_warning || "No major issues detected."}
                </p>
                <p className="text-[#5b5fc7] font-medium text-base md:text-lg">
                    3. Suggested Projects: {result.project_suggestions}
                </p>
                <p className="text-[#5b5fc7] font-medium text-base md:text-lg">
                    4. Persona: {result.startup_vs_solver}
                </p>
                <p className="text-[#5b5fc7] font-medium text-base md:text-lg">
                    5. Summary: {result.summary}
                </p>
            </div>

            <button className="bg-[#1e293b] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-medium text-base md:text-lg hover:bg-black transition-colors shadow-lg cursor-pointer w-full md:w-auto">
                Download AI Full Report
            </button>

        </div>

      </main>
    </div>
  );
};

export default ResultPage;
