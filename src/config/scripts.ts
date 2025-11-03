import { ScriptConfig } from '../types';

export const scriptConfigs: ScriptConfig[] = [

    {
    id: 'update-salesforce-quote',
    name: 'Update Single Salesforce Quote',
    description: 'Update single quote data in Salesforce',
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
        id: 'fieldName',
        label: 'Field Name',
        type: 'text',
        placeholder: 'Enter your Correct field name eg. txn.custom.purchaseOrderNumber',
        required: true,
      },
       {
        id: 'value',
        label: 'Value',
        type: 'text',
        placeholder: 'Enter the field value',
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
  },
  


    {
    id: 'update-salesforce-bulk-quote',
    name: 'Update Salesforce Bulk Quote',
    description: 'Update quote data in Salesforce with the information from CSV file',
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
        label: 'Exclusion Blueprint Name',
        type: 'text',
        placeholder: 'Enter blueprint name which needs to be excluded, leave it blank if all needs to be deployed',
      },
    ],
  },
  {
    id: 'sync-data',
    name: 'Sync Data',
    description: 'The TM Migration Tool',
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
      }
    ],
   
  },
];
