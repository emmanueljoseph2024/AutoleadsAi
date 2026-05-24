import Modal from './Modal';
import Button from './Button';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const iconConfig = {
  danger: { bg: 'bg-[#FEE2E2]', icon: 'text-[#EF4444]' },
  warning: { bg: 'bg-[#FEF3C7]', icon: 'text-[#F59E0B]' },
  info: { bg: 'bg-[#EFF6FF]', icon: 'text-[#2563EB]' },
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) => {
  const { bg, icon } = iconConfig[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          <FiAlertTriangle className={`w-6 h-6 ${icon}`} />
        </div>
        <h3 className="text-lg font-bold text-[#111827] mb-2">{title}</h3>
        <p className="text-sm text-[#6B7280] mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;