import { useState, useEffect } from 'react';
import Divider from '../layout/Divider';
import { getPersona } from '../../data/personas';
import { getPersonalizedRecs } from '../../data/lineup';
import { buildChallengeUrlById } from '../../utils/shareUrl';
import { savePlayer } from '../../lib/players';

export default function ResultScreen({ personaId, playerName, scores, dayPicks, challenger, myPlayerId, onPlayerSaved, onShareCard, onCompare, onRestart }) {
  const persona = getPersona(personaId);
  const recommendations = getPersonalizedRecs(scores || {}, dayPicks, personaId);
  const [copied, setCopied] = useState(false);

  // Save player to Supabase on first render of result screen
  useEffect(() => {
    if (myPlayerId || !personaId || !playerName) return;
    savePlayer({ name: playerName, personaId, dayPicks })
      .then((player) => { if (player?.id) onPlayerSaved(player.id); })
      .catch(() => { /* offline fallback — challenge links won't persist */ });
  }, [personaId, playerName, myPlayerId]);

  const handleChallenge = async () => {
    if (!myPlayerId) return;
    const url = buildChallengeUrlById(myPlayerId);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('textarea');
      input.value = url;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" style={{ animation: 'slideUp 0.4s ease-out forwards' }}>
      <Divider text="Your Stage Match" />

      <div className="text-center w-full mb-3">
        <h2
          className="font-oswald font-black uppercase text-white leading-[0.8] mb-2"
          style={{
            fontSize: '48px',
            letterSpacing: '-0.05em',
            transform: 'scaleY(1.1)',
            animation: 'glow 2s ease-in-out infinite alternate',
          }}
        >
          {persona.stage}
        </h2>
        <p className="font-inter font-black uppercase text-orange text-sm tracking-[0.15em]">
          {persona.title}
        </p>
        <p className="font-inter text-xs tracking-[0.05em] text-white/60 mt-1 px-4 italic">
          &ldquo;{persona.subtitle}&rdquo;
        </p>
      </div>

      <Divider text="Featuring" />

      <div className="flex flex-wrap justify-center items-center px-4 mt-1 mb-4" style={{ gap: '4px 8px' }}>
        {persona.traits.slice(0, 4).map((trait, i) => (
          <span key={trait}>
            <span className="font-inter font-bold uppercase text-xs tracking-tight">{trait}</span>
            {i < 3 && <span className="text-white/50 text-[0.6em] mx-2 inline-block align-middle">&bull;</span>}
          </span>
        ))}
      </div>

      {recommendations.length > 0 && (
        <>
          <Divider text="Artists You'd Vibe With" />
          <div className="w-full max-w-[400px] mx-auto px-4 mt-1 mb-4 flex flex-col gap-2">
            {recommendations.map((artist) => (
              <div
                key={artist.name}
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="font-inter font-bold text-xs text-white">{artist.name}</span>
                  <span className="text-[0.55rem] text-accent-teal uppercase tracking-[0.15em] ml-2 font-inter">
                    {artist.stage}
                  </span>
                </div>
                <span className="text-[0.55rem] text-white/50 uppercase tracking-[0.1em] font-inter">
                  {artist.day}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex items-center gap-2">
        {onCompare && challenger && (
          <button
            onClick={onCompare}
            className="px-5 py-2.5 text-white font-black uppercase rounded-full transition-all hover:scale-105 active:scale-95 bg-orange"
            style={{ letterSpacing: '0.05em', fontSize: '10px', boxShadow: '0 0 15px rgba(255,92,0,0.4)' }}
          >
            Chemistry with {challenger.name}
          </button>
        )}

        {!onCompare && (
          <button
            onClick={handleChallenge}
            className="px-5 py-2.5 text-white font-black uppercase rounded-full transition-all hover:scale-105 active:scale-95 bg-orange"
            style={{ letterSpacing: '0.05em', fontSize: '10px', boxShadow: '0 0 15px rgba(255,92,0,0.4)' }}
          >
            {copied ? 'Link Copied!' : 'Compare Vibes with a Friend'}
          </button>
        )}

        <button
          onClick={onShareCard}
          className="px-5 py-2.5 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] rounded-full transition-all active:scale-95 hover:bg-white/15"
        >
          Share Card
        </button>
      </div>

      <button
        onClick={onRestart}
        className="mt-3 font-bold uppercase text-white/40 text-[10px] tracking-[0.2em] hover:text-white/60 transition-colors"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}
      >
        Retake Quiz
      </button>
    </div>
  );
}
