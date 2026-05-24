// src/components/niches/NicheForm.tsx

import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { sanitizeString, normalizeName } from '../../utils/sanitizers';

interface NicheFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NicheFormData) => Promise<void>;
  initialData?: NicheFormData;
}

interface NicheFormData {
  name: string;
  keywords: string[];
  location: string;
  sources: string[];
}

const sourceOptions = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'website', label: 'Website' },
  { value: 'google_maps', label: 'Google Maps' },
  { value: 'news', label: 'News' },
  { value: 'apollo', label: 'Apollo' },
];

const NicheForm = ({ isOpen, onClose, onSubmit, initialData }: NicheFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');
  const [location, setLocation] = useState(initialData?.location || '');
  const [sources, setSources] = useState<string[]>(initialData?.sources || ['linkedin', 'website']);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Niche name is required';
    if (name.length > 100) newErrors.name = 'Name must be under 100 characters';
    if (sources.length === 0) newErrors.sources = 'Select at least one source';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 10) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSourceToggle = (source: string) => {
    setSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
    if (errors.sources) setErrors((prev) => ({ ...prev, sources: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({
        name: normalizeName(sanitizeString(name)),
        keywords: keywords.map((k) => sanitizeString(k)),
        location: sanitizeString(location),
        sources,
      });
      onClose();
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Failed to save niche' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Niche' : 'Create Niche'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <Input
          label="Niche Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          placeholder="e.g., Miami Real Estate Agents"
          error={errors.name}
          maxLength={100}
          autoFocus
        />

        <Input
          label="Location (optional)"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Miami, FL"
          maxLength={200}
        />

        {/* Keywords */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5">
            Keywords
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="Add keyword and press Enter"
              className="flex-1 px-3 sm:px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              maxLength={50}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddKeyword}
              disabled={!keywordInput.trim() || keywords.length >= 10}
              icon={<FiPlus className="w-4 h-4" />}
            >
              Add
            </Button>
          </div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full text-xs font-medium"
                >
                  {sanitizeString(kw)}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="text-[#2563EB] hover:text-[#EF4444] transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sources */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
            Data Sources
          </label>
          {errors.sources && (
            <p className="text-[10px] sm:text-xs text-[#EF4444] mb-2">{errors.sources}</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {sourceOptions.map((source) => {
              const isSelected = sources.includes(source.value);
              return (
                <button
                  key={source.value}
                  type="button"
                  onClick={() => handleSourceToggle(source.value)}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/30'
                      : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }
                  `}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D1D5DB]'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {source.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error */}
        {errors.submit && (
          <div className="p-3 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl text-[#EF4444] text-xs">
            {errors.submit}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1" type="button">
            Cancel
          </Button>
          <Button type="submit" loading={loading} className="flex-1">
            {initialData ? 'Save Changes' : 'Create Niche'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NicheForm;