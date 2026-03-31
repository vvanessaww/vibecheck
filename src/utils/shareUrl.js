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
 * Build a results URL that shows chemistry between two players directly.
 */
export function buildResultsUrl(myPlayerId, challengerPlayerId) {
  const base = window.location.origin + window.location.pathname;
  return `${base}?results=${myPlayerId},${challengerPlayerId}`;
}

/**
 * Parse challenge param from URL — supports player ID (?c=), results pair (?results=), and legacy base64 (?challenge=).
 */
export function parseChallengeParam() {
  const params = new URLSearchParams(window.location.search);
  const results = params.get('results');
  if (results && results.includes(',')) {
    const [player1, player2] = results.split(',');
    return { type: 'results', value: { player1, player2 } };
  }
  const playerId = params.get('c');
  if (playerId) return { type: 'id', value: playerId };
  const legacy = params.get('challenge');
  if (legacy) return { type: 'legacy', value: legacy };
  return null;
}
