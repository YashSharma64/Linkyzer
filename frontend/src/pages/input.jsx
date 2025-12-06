import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      alert("Please upload a PDF or screenshot of your LinkedIn profile.");
      return;
    }
    
    navigate('/result', { 
      state: { 
        image: selectedImage 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col font-sans relative">
    
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-xl p-4 md:p-6 max-w-lg w-[90%] md:w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center">How to export your LinkedIn Profile</h3>
            
            <div className="space-y-6">
                {/* Option 1: PDF */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">RECOMMENDED</span>
                        <h4 className="font-semibold text-gray-800 text-sm md:text-base">Option 1: Save as PDF (Best Results)</h4>
                    </div>
                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 ml-1">
                        <li>Open your LinkedIn Profile.</li>
                        <li>Click <span className="font-semibold">More</span> button (near message button).</li>
                        <li>Select <span className="font-semibold">Save to PDF</span>.</li>
                        <li>Upload the downloaded PDF here.</li>
                    </ol>
                    <div className="mt-4 text-center">
                        <a 
                            href="https://www.linkedin.com/in/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-[#0077b5] hover:bg-[#006097] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
                        >
                            Open LinkedIn Profile
                        </a>
                    </div>
                </div>

                {/* Option 2: Screenshot */}
                <div className="p-4 rounded-lg border border-gray-200">
                     <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">Option 2: Take a Screenshot</h4>
                     <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 ml-1">
                        <li>Go to your profile top section.</li>
                        <li>Press <kbd className="bg-gray-100 px-1 rounded">PrntScrn</kbd> (Win) or <kbd className="bg-gray-100 px-1 rounded">Cmd+Shift+4</kbd> (Mac).</li>
                        <li>Capture the visible area and upload.</li>
                    </ol>
                </div>
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 w-full max-w-6xl mx-auto border-b border-gray-400">
        <div className="flex items-center gap-4">
         <img src="/Linklogonew.png" alt="Logo" className="w-[100px] md:w-[110px] h-auto object-contain" />
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 text-gray-600">
           <img src="/Linkedinlogo.png" alt="Logo" className="w-[20px] h-[20px] object-contain" />
           <span className="text-xs md:text-sm font-medium hidden sm:inline">AI tells you what your LinkedIn is missing.</span>
        </div>
      </header>
    
      <main className="flex-grow flex flex-col items-center justify-start pt-24 md:pt-28 px-4 pb-12">
        
        <div className="text-center mb-6 md:mb-8 z-10 w-full px-2">
            <p className="text-base md:text-lg text-gray-600 font-light">Let AI reveal the story your LinkedIn is actually telling...</p>
        </div>

        <div className="relative w-full max-w-4xl flex flex-col items-center">
            
            <div className="relative z-0 w-full flex justify-center">
                <img src="/linkyzer.png" alt="Dashboard Preview" className="w-full md:w-[100%] h-auto object-contain drop-shadow-2xl rounded-[20px] md:rounded-[40px]" />
            </div>

            <div className="-mt-6 md:-mt-12 z-20 w-full px-2 flex justify-center">
                <div className="bg-white rounded-[30px] md:rounded-full p-4 md:p-2 md:pl-6 md:pr-2 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-[90%] md:w-auto md:min-w-[300px] h-auto">
                    <button 
                        onClick={() => setShowHelp(true)}
                        className="text-sm text-gray-500 hover:text-blue-600 underline font-medium transition-colors cursor-pointer whitespace-nowrap order-2 md:order-1"
                    >
                        How to get PDF / Screenshot?
                    </button>

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept="image/*,application/pdf" 
                        className="hidden" 
                    />
                    <button 
                        onClick={triggerFileInput}
                        className={`bg-blue-900 hover:bg-slate-800 text-white px-8 py-3 md:py-4 rounded-full text-base font-medium transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer w-full md:w-auto order-1 md:order-2 ${selectedImage ? 'ring-2 ring-green-500 bg-green-600 hover:bg-green-700' : ''}`}
                    >
                        {selectedImage ? "File Uploaded!" : "Upload PDF or Screenshot"}
                    </button>
                </div>
            </div>

            <div className="mt-8 z-20 w-full flex justify-center">
                <button 
                    onClick={handleAnalyze}
                    className="bg-gray-900 text-white hover:bg-white hover:text-gray-900 px-10 py-3.5 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 transform hover:-translate-y-1 h-[60px] cursor-pointer w-[90%] md:w-auto"
                >
                    Analyse My Profile
                </button>
            </div>

        </div>

      </main>
    </div>
  );
};

export default InputPage;
