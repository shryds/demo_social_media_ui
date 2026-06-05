let handler = null;

export function registerToastHandler(fn) {
  handler = fn;
}

export function emitToast(message, type = "error") {
  if (handler) {
    handler(message, type);
  }
}
