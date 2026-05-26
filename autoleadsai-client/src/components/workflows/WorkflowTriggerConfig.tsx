// src/components/workflows/WorkflowTriggerConfig.tsx

import Dropdown from '../common/Dropdown';

interface WorkflowTriggerConfigProps {
  trigger: {
    type: string;
    config: any;
  };
  onChange: (trigger: { type: string; config: any }) => void;
}

const triggerOptions = [
  { value: 'new_lead', label: 'New Lead Discovered' },
  { value: 'lead_scored', label: 'Lead Scored' },
  { value: 'manual', label: 'Manual Trigger Only' },
];

const qualificationOptions = [
  { value: 'hot', label: 'Hot' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
  { value: 'any', label: 'Any Qualification' },
];

const WorkflowTriggerConfig = ({ trigger, onChange }: WorkflowTriggerConfigProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5">
      <h3 className="text-sm font-bold text-[#111827] mb-3">Trigger</h3>
      <Dropdown
        label="When should this workflow run?"
        options={triggerOptions}
        value={trigger.type}
        onChange={(value) => onChange({ type: value, config: {} })}
      />

      {trigger.type === 'lead_scored' && (
        <div className="mt-3">
          <Dropdown
            label="Only for qualification"
            options={qualificationOptions}
            value={trigger.config?.qualification || 'any'}
            onChange={(value) =>
              onChange({ ...trigger, config: { ...trigger.config, qualification: value } })
            }
          />
        </div>
      )}

      {trigger.type === 'manual' && (
        <div className="mt-3 flex items-start gap-2 p-3 bg-[#FEF3C7] rounded-xl">
          <span className="text-sm shrink-0">💡</span>
          <p className="text-xs text-[#92400E]">
            Manual workflows must be triggered from the Leads page by selecting a lead and choosing "Run Workflow".
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowTriggerConfig;