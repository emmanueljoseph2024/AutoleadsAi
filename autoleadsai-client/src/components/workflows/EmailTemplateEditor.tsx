// src/components/workflows/EmailTemplateEditor.tsx

import { useState } from 'react';
import { FiEye, FiSave, FiCopy, FiCheck, FiInfo } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Toast from '../common/Toast';
import { sanitizeString } from '../../utils/sanitizers';

interface EmailTemplate {
  subject: string;
  body: string;
  templateId?: string;
}

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onChange: (template: EmailTemplate) => void;
  onSave?: (template: EmailTemplate) => void;
  saving?: boolean;
}

const presetTemplates = [
  {
    id: 'initial_outreach',
    name: 'Initial Outreach',
    subject: 'Quick question about {{company}}',
    body: `Hi {{firstName}},

I came across {{company}} and noticed you're in the real estate space. 

I help agents like you find qualified leads using AI — would you be open to a quick chat?

Best,
{{senderName}}`,
  },
  {
    id: 'follow_up_1',
    name: 'Follow-up 1',
    subject: 'Following up — {{company}}',
    body: `Hi {{firstName}},

Just wanted to follow up on my previous message. 

I'd love to show you how we can help {{company}} generate more leads automatically.

Let me know if you'd like to learn more!

Best,
{{senderName}}`,
  },
  {
    id: 'value_pitch',
    name: 'Value Pitch',
    subject: 'How {{company}} can 10x leads with AI',
    body: `Hi {{firstName}},

Real estate professionals using AutoLeads AI are seeing:

• 3x more qualified leads
• 40% higher response rates
• 24/7 automated outreach

Would you be interested in a demo to see how {{company}} can achieve similar results?

Best,
{{senderName}}`,
  },
  {
    id: 'closing',
    name: 'Closing',
    subject: 'Last call — {{company}}',
    body: `Hi {{firstName}},

I've reached out a few times and wanted to make one final attempt.

If you're not interested, no worries — just let me know and I'll stop reaching out.

But if you are curious about AI-powered lead generation, I'd love to chat!

Best,
{{senderName}}`,
  },
];

const availableVariables = [
  { variable: '{{firstName}}', label: 'First Name' },
  { variable: '{{lastName}}', label: 'Last Name' },
  { variable: '{{company}}', label: 'Company' },
  { variable: '{{email}}', label: 'Email' },
  { variable: '{{source}}', label: 'Source Platform' },
  { variable: '{{senderName}}', label: 'Your Name' },
  { variable: '{{senderCompany}}', label: 'Your Company' },
];

const EmailTemplateEditor = ({
  template,
  onChange,
  onSave,
  saving = false,
}: EmailTemplateEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const handlePresetSelect = (presetId: string) => {
    const preset = presetTemplates.find((p) => p.id === presetId);
    if (preset) {
      onChange({
        subject: preset.subject,
        body: preset.body,
        templateId: presetId,
      });
    }
  };

  const handleInsertVariable = (variable: string) => {
    const textarea = document.getElementById('email-body-editor') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newBody =
        template.body.substring(0, start) + variable + template.body.substring(end);
      onChange({ ...template, body: newBody });
      // Set cursor position after variable insertion
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = template.body;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderPreview = () => {
    let previewBody = template.body;
    let previewSubject = template.subject;

    const sampleData: Record<string, string> = {
      '{{firstName}}': 'John',
      '{{lastName}}': 'Doe',
      '{{company}}': 'Skyline Properties',
      '{{email}}': 'john@skyline.com',
      '{{source}}': 'LinkedIn',
      '{{senderName}}': 'Sarah',
      '{{senderCompany}}': 'AutoLeads AI',
    };

    Object.entries(sampleData).forEach(([key, value]) => {
      previewBody = previewBody.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
      previewSubject = previewSubject.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
    });

    return { subject: previewSubject, body: previewBody };
  };

  const preview = renderPreview();

  return (
    <div className="space-y-5">
      {/* Preset Templates */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
          Start from a Template
        </label>
        <div className="grid grid-cols-2 gap-2">
          {presetTemplates.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className={`
                text-left px-3 py-2 rounded-xl text-xs transition-all
                ${template.templateId === preset.id
                  ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/30 font-medium'
                  : 'bg-[#F9FAFB] text-[#6B7280] border border-[#E5E7EB] hover:border-[#D1D5DB]'
                }
              `}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <Input
        label="Email Subject"
        type="text"
        value={template.subject}
        onChange={(e) => onChange({ ...template, subject: e.target.value.slice(0, 200) })}
        placeholder="Enter subject line..."
        maxLength={200}
        hint="Use {{company}}, {{firstName}} for personalization"
      />

      {/* Body */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
          Email Body
        </label>
        <textarea
          id="email-body-editor"
          value={template.body}
          onChange={(e) => onChange({ ...template, body: e.target.value.slice(0, 5000) })}
          placeholder="Write your email..."
          rows={8}
          maxLength={5000}
          className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-y"
        />
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[10px] text-[#9CA3AF]">
            {template.body.length}/5000 characters
          </p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] text-[#6B7280] hover:text-[#2563EB] transition-colors"
          >
            {copied ? (
              <>
                <FiCheck className="w-3 h-3 text-[#22C55E]" /> Copied
              </>
            ) : (
              <>
                <FiCopy className="w-3 h-3" /> Copy Body
              </>
            )}
          </button>
        </div>
      </div>

      {/* Variables */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
          Personalization Variables
        </label>
        <p className="text-[10px] text-[#9CA3AF] mb-2">
          Click a variable to insert it at cursor position in the body
        </p>
        <div className="flex flex-wrap gap-1.5">
          {availableVariables.map((v) => (
            <button
              key={v.variable}
              onClick={() => handleInsertVariable(v.variable)}
              className="px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full text-[10px] font-medium hover:bg-[#DBEAFE] transition-colors"
              title={v.label}
            >
              {v.variable}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 p-3 bg-[#F9FAFB] rounded-xl">
        <FiInfo className="w-4 h-4 text-[#9CA3AF] mt-0.5 shrink-0" />
        <div className="text-xs text-[#6B7280]">
          <p className="font-medium mb-0.5">Available variables:</p>
          <p>
            {availableVariables.map((v) => v.variable).join(', ')}
          </p>
        </div>
      </div>

      {/* Preview Toggle */}
      <div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:underline"
        >
          <FiEye className="w-4 h-4" />
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>

        {showPreview && (
          <div className="mt-3 p-4 bg-white border border-[#E5E7EB] rounded-xl animate-slide-up">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">
              Preview
            </p>
            <p className="text-sm font-semibold text-[#111827] mb-2">
              {sanitizeString(preview.subject)}
            </p>
            <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">
              {sanitizeString(preview.body)}
            </p>
          </div>
        )}
      </div>

      {/* Save Button */}
      {onSave && (
        <Button
          onClick={() => onSave(template)}
          loading={saving}
          icon={<FiSave className="w-4 h-4" />}
          className="w-full"
        >
          Save Template
        </Button>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default EmailTemplateEditor;