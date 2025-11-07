import React from 'react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="w-full animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">Generated Result</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Original Image</h3>
            <div className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                 <img src={originalImage} alt="Original" className="object-contain max-h-full max-w-full" />
            </div>
        </div>
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Generated Three-View</h3>
             <div className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={generatedImage} alt="Generated Three Views" className="object-contain max-h-full max-w-full" />
            </div>
        </div>
        </div>
    </div>
  );
};

// Add fade-in animation to tailwind.config.js if it existed, but here we add it via a style tag in html (or just rely on browser defaults if simple enough)
// For this project, we can inject a style tag or define it in index.html if necessary.
// Since we can't edit tailwind config, we'll create a simple CSS animation.
// A simple way is just to add a class `animate-fade-in` and define it in index.html, but let's do it cleanly without assuming index.html can be modified with style tags. For now, a simple class name will suffice and it can be paired with a global stylesheet. We'll just add the class name.
// A simple fade-in can be achieved by setting opacity from 0 to 1, which many component libraries have.
// We'll simulate this with a keyframe animation that we will assume is globally available.
// Let's add the keyframes and animation class to index.html for simplicity.

// I will add the style to index.html. Oops, can't do that.
// Let's rely on standard Tailwind classes for a fade-in effect on mount, or just let it render. The component appearing is animation enough.
// Ok, I will just make it simple. No custom CSS animations.