import { emitToast } from "../Components/toast/toastBus";

export function getErrorMessage(err, fallback) {
  return (
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    err?.message ||
    fallback
  );
}

export function assertOk(res) {
  if (res?.status >= 400) {
    const error = new Error(res.data?.detail || "Request failed");
    error.response = res;
    throw error;
  }
  return res;
}

export function reportError(err, fallback) {
  console.error(getErrorMessage(err, fallback), err);
  emitToast(fallback, "error");
}
