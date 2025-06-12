// components/ConfirmAlert.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmAlertProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  theme?: 'danger' | 'info' | 'logout';
}

export default function ConfirmAlert({
  show,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action is irreversible.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  theme = 'danger',
}: ConfirmAlertProps) {
  const themeColors = {
    danger: 'bg-red-600 hover:bg-red-700',
    info: 'bg-blue-600 hover:bg-blue-700',
    logout: 'bg-gray-700 hover:bg-gray-800',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2 text-white rounded-md ${themeColors[theme]}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
