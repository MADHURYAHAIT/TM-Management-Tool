import { ScriptConfig } from '../types';

export const scriptConfigs: ScriptConfig[] = [
  {
    id: 'update-salesforce-quote',
    name: 'Update Salesforce Quote',
    description: 'Update quote data in Salesforce with new information from CSV file',
    category: 'Salesforce',
    icon: 'Database',
    apiEndpoint: '/api/salesforce/update-quote',
    fields: [
      {
        id: 'instance',
        label: 'Salesforce Instance',
        type: 'select',
        required: true,
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Sandbox', value: 'sandbox' },
          { label: 'Dev', value: 'dev' },
        ],
      },
      {
        id: 'quoteId',
        label: 'Quote ID',
        type: 'text',
        placeholder: 'Enter Quote ID',
        required: true,
      },
      {
        id: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Optional notes about this update',
        required: false,
      },
    ],
    fileUploads: [
      {
        id: 'csvFile',
        label: 'Quote Data CSV',
        acceptedTypes: '.csv',
        required: true,
      },
    ],
  },
  


    {
    id: 'update-salesforce-quote',
    name: 'Update Salesforce Quote',
    description: 'Update quote data in Salesforce with new information from CSV file',
    category: 'Salesforce',
    icon: 'Database',
    apiEndpoint: '/api/salesforce/update-quote',
    fields: [
      {
        id: 'instance',
        label: 'Salesforce Instance',
        type: 'select',
        required: true,
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Sandbox', value: 'sandbox' },
          { label: 'Dev', value: 'dev' },
        ],
      },
      {
        id: 'quoteId',
        label: 'Quote ID',
        type: 'text',
        placeholder: 'Enter Quote ID',
        required: true,
      },
      {
        id: 'notes',
        label: 'Notes',
        type: 'textarea',
        placeholder: 'Optional notes about this update',
        required: false,
      },
    ],
    fileUploads: [
      {
        id: 'csvFile',
        label: 'Quote Data CSV',
        acceptedTypes: '.csv',
        required: true,
      },
    ],
  },

  {
    id: 'deploy-blueprint',
    name: 'Deploy Blueprint',
    description: 'Deploy a blueprint package to the specified instance',
    category: 'Deployment',
    icon: 'Rocket',
    apiEndpoint: '/api/deployment/blueprint',
    fields: [
      {
        id: 'instance',
        label: 'Target Instance',
        type: 'select',
        required: true,
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
          { label: 'Development', value: 'development' },
        ],
      },
      {
        id: 'blueprintName',
        label: 'Blueprint Name',
        type: 'text',
        placeholder: 'Enter blueprint name',
        required: true,
      },
      {
        id: 'version',
        label: 'Version',
        type: 'text',
        placeholder: 'e.g., 1.0.0',
        required: true,
      },
    ],
    fileUploads: [
      {
        id: 'blueprintZip',
        label: 'Blueprint Package (ZIP)',
        acceptedTypes: '.zip',
        required: true,
      },
    ],
  },
  {
    id: 'sync-data',
    name: 'Sync Data',
    description: 'Synchronize data between instances using CSV import',
    category: 'Data Management',
    icon: 'RefreshCw',
    apiEndpoint: '/api/data/sync',
    fields: [
      {
        id: 'sourceInstance',
        label: 'Source Instance',
        type: 'select',
        required: true,
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
          { label: 'Development', value: 'development' },
        ],
      },
      {
        id: 'targetInstance',
        label: 'Target Instance',
        type: 'select',
        required: true,
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
          { label: 'Development', value: 'development' },
        ],
      },
      {
        id: 'entityType',
        label: 'Entity Type',
        type: 'text',
        placeholder: 'e.g., quotes, accounts',
        required: true,
      },
    ],
    fileUploads: [
      {
        id: 'dataFile',
        label: 'Data File (CSV)',
        acceptedTypes: '.csv',
        required: true,
      },
    ],
  },
];
