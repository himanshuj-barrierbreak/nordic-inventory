import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Icon from './Icon';

const META = {
  success: { icon: 'check', label: 'Success', edge: 'border-l-accent' },
  error: { icon: 'alert', label: 'Error', edge: 'border-l-ink' },
  warning: { icon: 'alert', label: 'Warning', edge: 'border-l-mut' },
  info: { icon: 'info', label: 'Info', edge: 'border-l-line2' },
};

function ToastItem({ toast, onClose }) {
  const m = META[toast.type] || META.info;
  return (
    <div className={`bg-panel border border-line2 ${m.edge} border-l-2 rounded-md shadow-2xl px-3 py-2.5 flex items-start gap-2.5`}>
      <Icon name={m.icon} size={15} className="text-mut mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-ink">{m.label}</div>
        <div className="text-sm text-ink mt-0.5">{toast.message}</div>
      </div>
      <button onClick={onClose} className="text-ink hover:text-ink p-0.5">
        <Icon name="close" size={13} />
      </button>
    </div>
  );
}

export function ToastHost() {
  const { toasts, dismissToast } = useAppContext();
  return (
    <div className="fixed top-16 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => dismissToast(t.id)} />
      ))}
    </div>
  );
}