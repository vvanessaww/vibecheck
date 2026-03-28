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

export function encodeChallengeData({ name, personaId, dayPicks }) {
  return btoa(JSON.stringify({ n: name, p: personaId, d: dayPicks }));
}

export function decodeChallengeData(encoded) {
  if (!encoded) return null;
  try {
    const data = JSON.parse(atob(encoded));
    return { name: data.n, personaId: data.p, dayPicks: data.d || [] };
  } catch {
    return null;
  }
}

export function buildChallengeUrl({ name, personaId, dayPicks }) {
  const encoded = encodeChallengeData({ name, personaId, dayPicks });
  const base = window.location.origin + window.location.pathname;
  return `${base}?challenge=${encoded}`;
}

/**
 * Build a challenge URL using a persisted player ID.
 */
export function buildChallengeUrlById(playerId) {
  const base = window.location.origin + window.location.pathname;
  return `${base}?c=${playerId}`;
}

/**
 * Parse challenge param from URL — supports both player ID (?c=) and legacy base64 (?challenge=).
 */
export function parseChallengeParam() {
  const params = new URLSearchParams(window.location.search);
  const playerId = params.get('c');
  if (playerId) return { type: 'id', value: playerId };
  const legacy = params.get('challenge');
  if (legacy) return { type: 'legacy', value: legacy };
  return null;
}
