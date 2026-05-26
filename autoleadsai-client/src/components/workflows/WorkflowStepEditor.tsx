// src/components/workflows/WorkflowStepEditor.tsx

import { FiInfo } from 'react-icons/fi';
import Input from '../common/Input';
import Dropdown from '../common/Dropdown';

interface WorkflowStep {
  type: string;
  config: any;
}

interface WorkflowStepEditorProps {
  step: WorkflowStep;
  onChange: (config: any) => void;
}

const templateOptions = [
  { value: 'initial_outreach', label: 'Initial Outreach' },
  { value: 'follow_up_1', label: 'Follow-up 1' },
  { value: 'follow_up_2', label: 'Follow-up 2' },
  { value: 'value_pitch', label: 'Value Pitch' },
  { value: 'closing', label: 'Closing' },
];

const qualificationOptions = [
  { value: 'hot', label: 'Hot' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
];

const channelOptions = [
  { value: '#hot-leads', label: '#hot-leads' },
  { value: '#general', label: '#general' },
  { value: '#alerts', label: '#alerts' },
];

const conditionOptions = [
  { value: 'score > 70', label: 'Score > 70' },
  { value: 'score > 50', label: 'Score > 50' },
  { value: 'qualification == hot', label: 'Qualification = Hot' },
  { value: 'qualification == warm', label: 'Qualification = Warm' },
];

const WorkflowStepEditor = ({ step, onChange }: WorkflowStepEditorProps) => {
  const renderConfig = () => {
    switch (step.type) {
      case 'email':
        return (
          <div className="space-y-3">
            <Dropdown
              label="Email Template"
              options={templateOptions}
              value={step.config?.template || 'initial_outreach'}
              onChange={(value) => onChange({ ...step.config, template: value })}
            />
            <Input
              label="From Name (optional)"
              type="text"
              value={step.config?.fromName || ''}
              onChange={(e) => onChange({ ...step.config, fromName: e.target.value })}
              placeholder="John from AutoLeads AI"
              maxLength={100}
            />
          </div>
        );

      case 'delay':
        return (
          <Input
            label="Delay (days)"
            type="number"
            value={step.config?.days || 2}
            onChange={(e) => onChange({ ...step.config, days: parseInt(e.target.value) || 2 })}
            hint="Number of days to wait before the next step"
            min={1}
            max={30}
          />
        );

      case 'filter':
        return (
          <Dropdown
            label="Filter by Qualification"
            options={qualificationOptions}
            value={step.config?.qualification || 'hot'}
            onChange={(value) => onChange({ ...step.config, qualification: value })}
          />
        );

      case 'slack_alert':
        return (
          <div className="space-y-3">
            <Dropdown
              label="Channel"
              options={channelOptions}
              value={step.config?.channel || '#hot-leads'}
              onChange={(value) => onChange({ ...step.config, channel: value })}
            />
            <Input
              label="Custom Message (optional)"
              type="text"
              value={step.config?.message || ''}
              onChange={(e) => onChange({ ...step.config, message: e.target.value })}
              placeholder="🔥 New hot lead: {{lead.name}}"
              maxLength={500}
            />
          </div>
        );

      case 'crm_sync':
        return (
          <Dropdown
            label="Action"
            options={[
              { value: 'create_contact', label: 'Create Contact' },
              { value: 'update_contact', label: 'Update Contact' },
              { value: 'create_deal', label: 'Create Deal' },
            ]}
            value={step.config?.action || 'create_contact'}
            onChange={(value) => onChange({ ...step.config, action: value })}
          />
        );

      case 'condition':
        return (
          <Dropdown
            label="Condition"
            options={conditionOptions}
            value={step.config?.condition || 'score > 70'}
            onChange={(value) => onChange({ ...step.config, condition: value })}
          />
        );

      case 'scoring':
        return (
          <div className="flex items-start gap-2 p-3 bg-[#EFF6FF] rounded-xl">
            <FiInfo className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
            <p className="text-xs text-[#2563EB]">
              AI scoring runs automatically using n8n. No additional configuration needed.
            </p>
          </div>
        );

      default:
        return (
          <p className="text-xs text-[#9CA3AF]">No configuration available for this step type.</p>
        );
    }
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-[#111827] mb-3 capitalize">
        {step.type.replace(/_/g, ' ')} Settings
      </h4>
      {renderConfig()}
    </div>
  );
};

export default WorkflowStepEditor;