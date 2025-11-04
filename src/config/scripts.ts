import { ScriptConfig } from '../types';

export const scriptConfigs: ScriptConfig[] = [

     {
    id: 'update-salesforce-quote-Lines',
    name: 'Update Single Salesforce Quote Lines',
    description: 'Update single quote Line data in Salesforce',
    category: 'Salesforce',
    action:"Execute",
    icon: 'Upload',
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
        label: 'Quote UUID',
        type: 'text',
        placeholder: 'Enter Quote UUID',
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
        label: 'Quote Updated CSV file',
        acceptedTypes: '.csv',
        required: true,
      },
    ],
  },
  

    {
    id: 'update-salesforce-quote-header',
    name: 'Update Single Salesforce Quote Header',
    description: 'Update single quote data in Salesforce',
    category: 'Salesforce',
    icon: 'Upload',
    action:"Execute",
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
    id: 'delete-salesforce-bulk-quote-lines',
    name: 'Delete Salesforce Bulk Quote Lines',
    description: 'Delete quote Lines in Salesforce with line info from CSV',
    category: 'Salesforce',
    action:"Execute",
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
    action:"Execute",
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
    action:"Execute",
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
// In script.ts, update the 'download-line-data' config:

{
  id: 'download-line-data',
  name: 'Download Line Data',
  description: 'The file downloading tool',
  category: 'Data Management',
  icon: 'Download',
  action: 'Download',
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
      id: 'quoteId',
      label: 'Quote UUID',
      type: 'text',
      placeholder: 'Enter Quote UUID',
      required: true,
    },
    {
      id: 'selectedFields',
      label: 'Fields',
      type: 'multiselect',
      placeholder: 'Select the fields to download',
      required: true,
      options: [
        { label: 'All', value: 'all' },  // Added: Selects all fields at once
        { label: 'UU ID', value: 'uuid' },
        { label: 'Product Name', value: 'name' },
        { label: 'Quantity', value: 'quantity' },
        {label : "Description", value: 'desc'},
        { label: 'List Price', value: 'price' },
         { label: 'Config Total', value: 'config' },
        { label: 'PA Discount%', value: 'padisc' },
        { label: 'Total PA Discount', value: 'patotal' },
        { label: 'PA Discount Amt', value: 'paamt' },
        { label: "Add' PA Discount%", value: 'addpadisc' },
        { label: 'Total Add PA Discount', value: 'addpatotal' },
        { label: "Add' PA Discount Amt", value: 'addpaamt' },
        { label: 'Manual PA Discount%', value: 'padisc1' },
        { label: 'Manual PA Discount Amt', value: 'paamt1' },
        { label: "Manual Add' PA Discount%", value: 'addpadisc1' },
        { label: "Manual Add' PA Discount Amt", value: 'addpaamt1' },
        { label: "Discount 1", value: 'disc1' },
        { label: "Discount 1 Type", value: 'disc1t' },
        { label: "Discount 1 Amt", value: 'disc1amt' },
        { label: "Discount 2", value: 'disc2' },
        { label: "Discount 2 Type", value: 'disc2t' },
        { label: "Discount 2 Amt", value: 'disc2amt' },
        { label: "Surcharge", value: 'surcharge' },
        { label: "Surcharge Amt", value: 'surchargeamt' },
        { label: "Inherited Product Line", value: 'ipl' },
        { label: "HTS", value: 'hts' },
        { label: "ECCN", value: 'eccn' },
        { label: "IN HSN", value: 'hsn' },
        { label: "IN SAC", value: 'sac' },
        { label: "Dominant COO", value: 'dominantcoo' },

        // Add more as needed
      ],
    },
  ],
},
];
