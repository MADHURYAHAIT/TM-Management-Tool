import { useState } from 'react';
import { X, Play, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ScriptConfig, ScriptFormData } from '../../types';
import FormField from '../Form/FormField';
import FileUpload from '../Form/FileUpload';

interface ScriptExecutorProps {
  script: ScriptConfig;
  onClose: () => void;
  onExecute: (scriptId: string, data: ScriptFormData) => Promise<void>;
}

export default function ScriptExecutor({ script, onClose, onExecute }: ScriptExecutorProps) {
  const [formData, setFormData] = useState<ScriptFormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const IconComponent = Icons[script.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const handleFieldChange = (fieldId: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    script.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    script.fileUploads?.forEach((upload) => {
      if (upload.required && !formData[upload.id]) {
        newErrors[upload.id] = `${upload.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('loading');
    setMessage('');

    try {
      await onExecute(script.id, formData);
      setStatus('success');
      setMessage('Script executed successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden border dark:border-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur rounded-xl flex items-center justify-center">
              {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{script.name}</h2>
              <p className="text-blue-100 text-sm">{script.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)] text-gray-900 dark:text-gray-100"
        >
          {script.fields.map((field) => (
            <FormField
              key={field.id}
              config={field}
              value={(formData[field.id] as string) || ''}
              onChange={(value) => handleFieldChange(field.id, value)}
              error={errors[field.id]}
            />
          ))}

          {script.fileUploads?.map((upload) => (
            <FileUpload
              key={upload.id}
              config={upload}
              value={(formData[upload.id] as File) || null}
              onChange={(file) => handleFieldChange(upload.id, file)}
              error={errors[upload.id]}
            />
          ))}

          {status === 'success' && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800 dark:text-green-300">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-700 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-300">{message}</p>
            </div>
          )}
        </form>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={status === 'loading'}
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            {status === 'loading' ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Execute Script</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
