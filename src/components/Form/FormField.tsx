import { FieldConfig } from '../../types';

interface FormFieldProps {
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function FormField({ config, value, onChange, error }: FormFieldProps) {
  const baseInputClasses = `w-full px-4 py-2.5 border rounded-lg transition-all focus:outline-none focus:ring-2
    ${
      error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-600 dark:focus:border-red-400 dark:focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-500'
    }
    bg-white text-gray-900 placeholder-gray-400
    dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
  `;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {config.type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClasses}
          required={config.required}
        >
          <option value="">Select {config.label}</option>
          {config.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : config.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config.placeholder}
          required={config.required}
          rows={4}
          className={baseInputClasses}
        />
      ) : (
        <input
          type={config.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config.placeholder}
          required={config.required}
          className={baseInputClasses}
        />
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
