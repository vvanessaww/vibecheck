export function encodeQuizState(state) {
  return btoa(JSON.stringify(state));
}

export function decodeQuizState(encoded) {
  if (!encoded) return null;
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}

export function buildShareUrl(state) {
  const encoded = encodeQuizState(state);
  const base = window.location.origin + window.location.pathname;
  return `${base}?q=${encoded}`;
}
