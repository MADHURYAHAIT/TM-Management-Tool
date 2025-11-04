// src/components/Form/FormField.tsx

import Select from 'react-select';

interface FormFieldProps {
  config: FieldConfig;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}

export default function FormField({ config, value, onChange, error }: FormFieldProps) {
  const baseInputClasses = `w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2
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
          value={value as string}
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
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config.placeholder}
          required={config.required}
          rows={4}
          className={baseInputClasses}
        />
      ) : config.type === 'multiselect' ? (
        (() => {
          const allOptions = config.options || [];
          const selectableOptions = allOptions.filter((opt) => opt.value != 'All');  // Exclude 'all' from selectable list
          const allValues = selectableOptions.map((opt) => opt.value);  // All actual field values
          const selectedValues = Array.isArray(value) ? value : [];

          // Determine if 'all' should be selected
          const isAllSelected = selectedValues.includes('all') || (selectedValues.length === allValues.length && selectedValues.every((v) => allValues.includes(v)));
          const displaySelected = isAllSelected ? ['all', ...allValues] : selectedValues.filter((v) => v !== 'all');

          const options = allOptions.map((opt) => ({ value: opt.value, label: opt.label }));
          const selectedOptions = options.filter((opt) => displaySelected.includes(opt.value));

          return (
            <Select
              isMulti
              options={options}
              value={selectedOptions}
              onChange={(selected) => {
                const selectedVals = selected ? selected.map((opt) => opt.value) : [];
                let newValues: string[] = [];

                if (selectedVals.includes('all')) {
                  // If 'all' is selected, select everything
                  newValues = [ ...allValues];
                } else {
                  // If 'all' is deselected, deselect all
                  newValues = selectedVals.filter((v) => v !== 'all');
                  // If all individual options are selected, add 'all'
                  if (newValues.length === allValues.length && allValues.every((v) => newValues.includes(v))) {
                    newValues = ['all', ...newValues];
                  }
                }

                // Remove 'all' from the actual values sent to onChange (API doesn't need it)
                const apiValues = newValues.filter((v) => v !== 'all');
                onChange(apiValues);
              }}
              placeholder={config.placeholder || 'Select options'}
              required={config.required}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'white',
                  borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db',
                  borderRadius: '0.5rem',
                  padding: '0.125rem',
                  boxShadow: state.isFocused ? (error ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : '0 0 0 3px rgba(59, 130, 246, 0.1)') : 'none',
                  '&:hover': {
                    borderColor: error ? '#ef4444' : '#3b82f6',
                  },
                  ...(document.documentElement.classList.contains('dark') && {
                    backgroundColor: '#1f2937',
                    borderColor: error ? '#dc2626' : state.isFocused ? '#60a5fa' : '#4b5563',
                    '&:hover': {
                      borderColor: error ? '#dc2626' : '#60a5fa',
                    },
                  }),
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  ...(document.documentElement.classList.contains('dark') && {
                    backgroundColor: '#1f2937',
                  }),
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#dbeafe' : 'white',
                  color: state.isSelected ? 'white' : '#374151',
                  ...(document.documentElement.classList.contains('dark') && {
                    backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#1e3a8a' : '#1f2937',
                    color: state.isSelected ? 'white' : '#d1d5db',
                  }),
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#e5e7eb',
                  ...(document.documentElement.classList.contains('dark') && {
                    backgroundColor: '#374151',
                  }),
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: '#374151',
                  ...(document.documentElement.classList.contains('dark') && {
                    color: '#d1d5db',
                  }),
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: '#6b7280',
                  '&:hover': {
                    color: '#374151',
                  },
                  ...(document.documentElement.classList.contains('dark') && {
                    color: '#9ca3af',
                    '&:hover': {
                      color: '#d1d5db',
                    },
                  }),
                }),
              }}
            />
          );
        })()
      ) : (
        <input
          type={config.type}
          value={value as string}
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
