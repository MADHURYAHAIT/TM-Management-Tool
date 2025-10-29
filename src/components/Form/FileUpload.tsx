import { useState, useRef } from 'react';
import { Upload, File, X, Check } from 'lucide-react';
import { FileUploadConfig } from '../../types';

interface FileUploadProps {
  config: FileUploadConfig;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string ;
}

export default function FileUpload({ config, value, onChange, error }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const acceptedTypes = config.acceptedTypes.split(',').map(t => t.trim());

    if (acceptedTypes.includes(fileExtension)) {
      onChange(file);
    } else {
      alert(`Please select a valid file type: ${config.acceptedTypes}`);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
  {config.label}
  {config.required && <span className="text-red-500 ml-1">*</span>}
</label>

{!value ? (
  <div
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    onClick={handleClick}
    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
      ${
        isDragging
          ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30'
          : error
          ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/30'
          : 'border-gray-300 hover:border-gray-400 bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-800'
      }
    `}
  >
    {/* ... */}
    <Upload
      className={`w-12 h-12 mx-auto mb-4 ${
        error ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-gray-500'
      }`}
    />
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Drop your file here or click to browse
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Accepted formats: {config.acceptedTypes}
    </p>
    {config.maxSize && (
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Max size: {formatFileSize(config.maxSize)}
      </p>
    )}
  </div>
) : (
  <div className="border border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
          <File className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(value.size)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <button
          onClick={handleRemove}
          className="p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  </div>
)}

{error && (
  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
)}
    </div>
  );
}
