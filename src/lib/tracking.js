import { supabase } from './supabase';

function getSessionId() {
  let id = sessionStorage.getItem('vibecheck_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('vibecheck_session_id', id);
  }
  return id;
}

/**
 * Log a screen view for drop-off analysis.
 */
export function trackScreen(screen) {
  if (!supabase) return;

  const sessionId = getSessionId();
  supabase
    .from('screen_events')
    .insert({ session_id: sessionId, screen })
    .then(() => {})
    .catch(() => {});
}
