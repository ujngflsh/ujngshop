import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ToastContext = createContext<(msg: string) => void>(() => {});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const show = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="animate-fade-in flex items-center gap-2 bg-maroon text-white text-sm px-4 py-2.5 rounded-full shadow-lg">
            <CheckCircle2 size={16} /> {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
