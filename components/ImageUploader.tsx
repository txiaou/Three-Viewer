import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-300 ${
        isDragging ? 'border-cyan-400 bg-gray-700/50' : 'border-gray-600 hover:border-cyan-500'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 rounded-md object-contain" />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
            <UploadIcon />
            <p className="mt-2 font-semibold">Click or drag an image to this area</p>
            <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};