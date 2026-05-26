// src/components/workflows/WorkflowTestButton.tsx

import { useState } from 'react';
import { FiPlay, FiCheck, FiX } from 'react-icons/fi';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface WorkflowTestButtonProps {
  workflowId: string;
  workflowName: string;
}

const WorkflowTestButton = ({ workflowId, workflowName }: WorkflowTestButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post(`/workflows/${workflowId}/test`);
      setResult({ success: true, message: data.message || 'Workflow tested successfully!' });
    } catch (err: any) {
      setResult({
        success: false,
        message: err?.response?.data?.error || 'Test failed. Please check your workflow configuration.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowModal(true)}
        icon={<FiPlay className="w-4 h-4" />}
      >
        Test
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Test: ${workflowName}`} size="sm">
        <div className="text-center">
          {!result ? (
            <>
              <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiPlay className="w-7 h-7 text-[#2563EB]" />
              </div>
              <p className="text-sm text-[#6B7280] mb-6">
                This will run the workflow with sample data to verify it works correctly.
              </p>
              <Button
                onClick={handleTest}
                loading={loading}
                icon={<FiPlay className="w-4 h-4" />}
                className="w-full"
              >
                Run Test
              </Button>
            </>
          ) : (
            <>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  result.success ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'
                }`}
              >
                {result.success ? (
                  <FiCheck className="w-7 h-7 text-[#22C55E]" />
                ) : (
                  <FiX className="w-7 h-7 text-[#EF4444]" />
                )}
              </div>
              <p className={`text-sm font-medium mb-2 ${result.success ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {result.success ? 'Test Passed!' : 'Test Failed'}
              </p>
              <p className="text-sm text-[#6B7280] mb-6">{result.message}</p>
              <Button
                variant="outline"
                onClick={() => { setShowModal(false); setResult(null); }}
                className="w-full"
              >
                Close
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default WorkflowTestButton;