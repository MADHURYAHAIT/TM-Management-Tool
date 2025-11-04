// src/types/index.tsx

export interface ScriptConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  action: string;  // Added: Required for configs like 'action: "Execute"'
  fields: FieldConfig[];
  fileUploads?: FileUploadConfig[];
  apiEndpoint: string;
}

export interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number' | 'multiselect';  // Merged from both definitions; added 'multiselect'
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: string;
}

export interface FileUploadConfig {
  id: string;
  label: string;
  acceptedTypes: string;
  maxSize?: number;
  required?: boolean;
}

export interface ExecutionLog {
  id: string;
  scriptId: string;
  scriptName: string;
  timestamp: Date;
  status: 'success' | 'error' | 'running' | 'pending';
  duration?: number;
  message?: string;
  user: string;
}

export interface ScriptFormData {
  [key: string]: string | string[] | File | null;  // Optional: If handling multiselect arrays, update to: string | string[] | File | null
}
