// src/components/leads/LeadImportModal.tsx

import { useState, useRef } from 'react';
import { FiUpload, FiFileText, FiAlertCircle, FiX } from 'react-icons/fi';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface LeadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<void>;
}

const LeadImportModal = ({ isOpen, onClose, onImport }: LeadImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError('');

    if (!selected) return;

    const allowedTypes = ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(selected.type)) {
      setError('Please upload a CSV, JSON, or Excel file.');
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.');
      return;
    }

    setFile(selected);
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      await onImport(file);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Import failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Leads" size="md">
      <div className="space-y-4">
        {/* File Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            file
              ? 'border-[#22C55E] bg-[#DCFCE7]'
              : 'border-[#D1D5DB] hover:border-[#2563EB] hover:bg-[#F9FAFB]'
          }`}
        >
          {file ? (
            <div className="flex items-center justify-center gap-2 text-[#22C55E]">
              <FiFileText className="w-5 h-5" />
              <span className="text-sm font-medium">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="ml-2 text-[#9CA3AF] hover:text-[#EF4444]"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <FiUpload className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
              <p className="text-sm text-[#6B7280]">
                Drag & drop a file or <span className="text-[#2563EB] font-medium">browse</span>
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">CSV, JSON, or Excel (max 10MB)</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 text-[#EF4444] text-xs">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            loading={loading}
            disabled={!file}
            className="flex-1"
          >
            Import Leads
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LeadImportModal;