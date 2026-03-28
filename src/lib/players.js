import { supabase } from './supabase';

/**
 * Save a player's quiz result. Returns the new player row, or null if Supabase is unavailable.
 */
export async function savePlayer({ name, personaId, dayPicks }) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('players')
    .insert({ name, persona_id: personaId, day_picks: dayPicks })
    .select()
    .single();

  if (error) throw new Error(`Failed to save player: ${error.message}`);
  return data;
}

/**
 * Fetch a player by ID. Returns null if not found or Supabase is unavailable.
 */
export async function getPlayer(id) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('players')
    .select()
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

/**
 * Record a challenge between two players.
 */
export async function saveChallenge({ challengerId, recipientId, chemistryScore }) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('challenges')
    .insert({
      challenger_id: challengerId,
      recipient_id: recipientId,
      chemistry_score: chemistryScore,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to save challenge: ${error.message}`);
  return data;
}

/**
 * Get all challenges involving a player (as challenger or recipient).
 */
export async function getChallengesForPlayer(playerId) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('challenges')
    .select(`
      id,
      chemistry_score,
      created_at,
      challenger:challenger_id ( id, name, persona_id, day_picks ),
      recipient:recipient_id ( id, name, persona_id, day_picks )
    `)
    .or(`challenger_id.eq.${playerId},recipient_id.eq.${playerId}`)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch challenges: ${error.message}`);
  return data;
}
