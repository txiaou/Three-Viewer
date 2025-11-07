import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { generateThreeViewImage } from './services/geminiService';
import { LoadingSpinner } from './components/icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    setImageFile(file);
    setGeneratedImageUrl(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateClick = async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const resultImageUrl = await generateThreeViewImage(imageFile);
      setGeneratedImageUrl(resultImageUrl);
    } catch (e) {
      console.error(e);
      setError("Generation failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Three-View <span className="text-cyan-400">Generator</span>
          </h1>
          <a
            href="https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash#nano-banana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Powered by Gemini 2.5 Flash Image
          </a>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="flex flex-col space-y-6">
            <div className="bg-gray-800/60 rounded-xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">1. Upload Image</h2>
              <ImageUploader onImageSelect={handleImageSelect} previewUrl={previewUrl} />
            </div>
            <button
              onClick={handleGenerateClick}
              disabled={!imageFile || isLoading}
              className="w-full flex justify-center items-center gap-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 shadow-lg"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Generating...</span>
                </>
              ) : (
                "2. Generate Three-View"
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-gray-800/60 rounded-xl p-6 shadow-2xl border border-gray-700 min-h-[300px] flex items-center justify-center">
            {error && <p className="text-red-400 text-center">{error}</p>}
            
            {!error && isLoading && (
              <div className="text-center text-gray-400">
                <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">The AI is working its magic...</p>
                <p className="text-sm mt-1">This may take a moment. Please wait.</p>
              </div>
            )}

            {!isLoading && !error && !generatedImageUrl && (
              <div className="text-center text-gray-500">
                <p>The generated view will be displayed here</p>
              </div>
            )}

            {!isLoading && !error && generatedImageUrl && (
                <ResultDisplay originalImage={previewUrl!} generatedImage={generatedImageUrl} />
            )}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Three-View Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;