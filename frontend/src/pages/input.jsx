import React from 'react';

const InputPage = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col font-sans">
     
      <header className="flex justify-evenly items-center px-8 py-4 mx-auto w-[100%] max-w-10xl rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-9">
        
          
         <img src="/Linklogonew.png" alt="Logo" className="w-[110px] h-[40px] object-contain" />
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
           <img src="/Linkedinlogo.png" alt="Logo" className="w-[20px] h-[20px] object-contain" />
           <span className="text-sm font-medium">AI tells you what your LinkedIn is missing.</span>
        </div>
      </header>

    
      <main className="flex-grow flex flex-col items-center justify-start pt-10 px-4 pb-12">
        
       
        <div className="text-center mb-8 z-10">
            <p className="text-lg text-gray-600 font-light">Let AI reveal the story your LinkedIn is actually telling...</p>
        </div>

      
        <div className="relative w-full max-w-4xl flex flex-col items-center">
            
            
            <div className="relative z-0 w-full flex justify-center">
                <img src="/linkyzer.png" alt="Dashboard Preview" className="w-full md:w-[100%] h-auto object-contain drop-shadow-2xl rounded-[40px]" />
                
            </div>

            
            <div className="-mt-8 md:-mt-12 z-20 w-[70%] md:w-[70%] px-4 flex justify-center">
                <div className="bg-white rounded-full p-2 pl-6 pr-2 shadow-lg flex items-center w-full max-w-2xl h-16">
                    <input 
                        type="text" 
                        placeholder="Enter Your Linkedin URL" 
                        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base px-2 h-[60px] rounded-full"
                    />
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm font-medium hidden sm:inline">or</span>
                        <button className="bg-blue-900 hover:bg-white hover:text-gray-900 hover:border-gray-900 border-1 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md active:scale-95 whitespace-nowrap h-[60px] cursor-pointer">
                            Upload Screenshot of Profile
                        </button>
                    </div>
                </div>
            </div>

          
            <div className="mt-8 z-20">
                <button className="bg-gray-900 text-white hover:bg-white hover:text-gray-900 px-10 py-3.5 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 transform hover:-translate-y-1 h-[60px] cursor-pointer">
                    Analyse My Profile
                </button>
            </div>

        </div>

      </main>
    </div>
  );
};

export default InputPage;
