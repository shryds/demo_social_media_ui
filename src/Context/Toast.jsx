import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { registerToastHandler } from "../Components/toast/toastBus";
import { ToastContainer } from "../Components/toast";

export const ToastContext = createContext();

const TOAST_DURATION = 5000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "error") => {
      const id = (idRef.current += 1);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismissToast(id), TOAST_DURATION);
    },
    [dismissToast],
  );

  useEffect(() => {
    registerToastHandler(showToast);
  }, [showToast]);

  return (
    <ToastContext value={{ showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext>
  );
}
