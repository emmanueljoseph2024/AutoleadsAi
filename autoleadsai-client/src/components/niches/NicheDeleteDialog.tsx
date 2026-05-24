// src/components/niches/NicheDeleteDialog.tsx

import ConfirmDialog from '../common/ConfirmDialog';

interface NicheDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nicheName: string;
  loading?: boolean;
}

const NicheDeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  nicheName,
  loading = false,
}: NicheDeleteDialogProps) => {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Niche"
      message={`Are you sure you want to delete "${nicheName}"? This will not delete the leads associated with this niche. You can still access them from the Leads page.`}
      confirmLabel="Delete Niche"
      cancelLabel="Keep Niche"
      variant="danger"
      loading={loading}
    />
  );
};

export default NicheDeleteDialog;