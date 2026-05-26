// src/components/workflows/WorkflowBuilder.tsx

import { useState } from 'react';
import { FiPlus, FiSave, FiPlay, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';
import WorkflowStepEditor from './WorkflowStepEditor';
import WorkflowTriggerConfig from './WorkflowTriggerConfig';
import { sanitizeString } from '../../utils/sanitizers';

interface WorkflowStep {
  type: 'scoring' | 'filter' | 'email' | 'crm_sync' | 'slack_alert' | 'delay' | 'condition';
  config: any;
  order: number;
}

interface WorkflowBuilderProps {
  name: string;
  onNameChange: (name: string) => void;
  trigger: {
    type: string;
    config: any;
  };
  onTriggerChange: (trigger: { type: string; config: any }) => void;
  steps: WorkflowStep[];
  onStepsChange: (steps: WorkflowStep[]) => void;
  onSave: () => void;
  onTest: () => void;
  saving?: boolean;
  testing?: boolean;
}

const availableSteps = [
  { type: 'scoring', label: 'AI Scoring', icon: '📊', description: 'Score lead with AI' },
  { type: 'filter', label: 'Filter', icon: '🔍', description: 'Filter by conditions' },
  { type: 'email', label: 'Send Email', icon: '✉️', description: 'Send outreach email' },
  { type: 'delay', label: 'Wait', icon: '⏱️', description: 'Delay before next step' },
  { type: 'crm_sync', label: 'CRM Sync', icon: '🔄', description: 'Sync to CRM' },
  { type: 'slack_alert', label: 'Slack Alert', icon: '🔔', description: 'Send Slack notification' },
  { type: 'condition', label: 'Condition', icon: '🔀', description: 'Branch by condition' },
];

const WorkflowBuilder = ({
  name,
  onNameChange,
  trigger,
  onTriggerChange,
  steps,
  onStepsChange,
  onSave,
  onTest,
  saving = false,
  testing = false,
}: WorkflowBuilderProps) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const handleAddStep = (type: string) => {
    const newStep: WorkflowStep = {
      type: type as WorkflowStep['type'],
      config: {},
      order: steps.length,
    };
    onStepsChange([...steps, newStep]);
    setSelectedStep(steps.length);
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      order: i,
    }));
    onStepsChange(updated);
    setSelectedStep(null);
  };

  const handleStepConfigChange = (index: number, config: any) => {
    const updated = steps.map((step, i) =>
      i === index ? { ...step, config } : step
    );
    onStepsChange(updated);
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === steps.length - 1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...steps];
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
    onStepsChange(updated.map((step, i) => ({ ...step, order: i })));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel — Trigger + Steps */}
      <div className="lg:col-span-2 space-y-4">
        {/* Workflow Name */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5">
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value.slice(0, 100))}
            placeholder="Workflow name..."
            className="w-full text-lg font-bold text-[#111827] bg-transparent border-none outline-none placeholder-[#9CA3AF]"
            maxLength={100}
          />
        </div>

        {/* Trigger Config */}
        <WorkflowTriggerConfig
          trigger={trigger}
          onChange={onTriggerChange}
        />

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index}>
              {/* Connector line */}
              {index > 0 && (
                <div className="flex items-center justify-center py-1">
                  <div className="w-px h-4 bg-[#D1D5DB]" />
                </div>
              )}

              <div
                onClick={() => setSelectedStep(index === selectedStep ? null : index)}
                className={`bg-white rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedStep === index
                    ? 'border-[#2563EB] shadow-md'
                    : 'border-[#E5E7EB] hover:border-[#2563EB]/30'
                }`}
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleMoveStep(index, 'up'); }}
                      disabled={index === 0}
                      className="w-5 h-5 flex items-center justify-center text-[#9CA3AF] hover:text-[#2563EB] disabled:opacity-30 text-xs"
                    >
                      ▲
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleMoveStep(index, 'down'); }}
                      disabled={index === steps.length - 1}
                      className="w-5 h-5 flex items-center justify-center text-[#9CA3AF] hover:text-[#2563EB] disabled:opacity-30 text-xs"
                    >
                      ▼
                    </button>
                  </div>

                  <span className="w-8 h-8 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] capitalize">
                      {step.type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-[#9CA3AF] truncate">
                      {step.type === 'email' && step.config?.template
                        ? `Template: ${step.config.template}`
                        : step.type === 'delay' && step.config?.days
                        ? `Wait ${step.config.days} day(s)`
                        : step.type === 'filter' && step.config?.qualification
                        ? `Qualification: ${step.config.qualification}`
                        : 'Click to configure'}
                    </p>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveStep(index); }}
                    className="p-1.5 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Step Editor (expanded) */}
                {selectedStep === index && (
                  <div className="border-t border-[#E5E7EB] p-4 animate-slide-up">
                    <WorkflowStepEditor
                      step={step}
                      onChange={(config) => handleStepConfigChange(index, config)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Connector for Add Step button */}
          {steps.length > 0 && (
            <div className="flex items-center justify-center py-1">
              <div className="w-px h-4 bg-[#D1D5DB]" />
            </div>
          )}
        </div>

        {/* Add Step */}
        <div className="bg-white rounded-2xl border border-dashed border-[#D1D5DB] p-4">
          <p className="text-xs font-medium text-[#6B7280] mb-3">Add Step</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableSteps.map((item) => (
              <button
                key={item.type}
                onClick={() => handleAddStep(item.type)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#F9FAFB] hover:bg-[#EFF6FF] border border-transparent hover:border-[#2563EB]/20 transition-all text-center"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium text-[#374151]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Actions */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 space-y-3 sticky top-20">
          <h3 className="text-sm font-bold text-[#111827]">Actions</h3>
          <Button
            onClick={onSave}
            loading={saving}
            icon={<FiSave className="w-4 h-4" />}
            className="w-full"
          >
            Save Workflow
          </Button>
          <Button
            onClick={onTest}
            loading={testing}
            variant="outline"
            icon={<FiPlay className="w-4 h-4" />}
            className="w-full"
          >
            Test Workflow
          </Button>

          <div className="pt-3 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#9CA3AF] mb-2">Summary</p>
            <div className="space-y-1.5 text-xs text-[#6B7280]">
              <p>Trigger: {trigger.type.replace(/_/g, ' ')}</p>
              <p>Steps: {steps.length}</p>
              <p className="capitalize">
                {steps.map((s) => s.type.replace(/_/g, ' ')).join(' → ') || 'No steps added'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;