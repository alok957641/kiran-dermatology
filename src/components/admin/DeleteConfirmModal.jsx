import { AlertTriangle, Trash2 } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this? This action cannot be undone.',
  confirmText = 'Delete',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-5">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">{message}</p>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
            disabled={loading}
            className="border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            fullWidth
            loading={loading}
            onClick={onConfirm}
            leftIcon={!loading ? Trash2 : undefined}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? 'Deleting...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}