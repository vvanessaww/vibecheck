import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Divider from '../layout/Divider';
import { getPersona } from '../../data/personas';
import { calculateChemistry, getScoreMessage } from '../../data/chemistry';
import { buildChallengeUrlById } from '../../utils/shareUrl';

export default function CompareScreen({ myData, challengerData, myPlayerId, onShareCard }) {
  const [copied, setCopied] = useState(false);

  const myPersona = getPersona(myData?.personaId);
  const theirPersona = getPersona(challengerData?.personaId);

  const { score, mutualArtists, blurb } = useMemo(
    () => {
      if (!myData?.personaId || !challengerData?.personaId) {
        return { score: 15, mutualArtists: [], blurb: "Something went wrong — but you're both at Coachella, so it's fine" };
      }
      return calculateChemistry(myData, challengerData);
    },
    [myData, challengerData],
  );

  const handleCopyLink = async () => {
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
    <div className="flex flex-col items-center justify-center w-full h-full" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
      <Divider text="Coachella Chemistry" />

      {/* Chemistry Score */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="text-center mb-4"
      >
        <div className="relative inline-flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="#ff5c00"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${score * 3.27} ${327 - score * 3.27}`}
              strokeDashoffset="82"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,92,0,0.4))' }}
            />
          </svg>
          <span className="absolute font-oswald text-4xl font-black text-white">
            {score}%
          </span>
        </div>
      </motion.div>

      {/* Side by side personas */}
      <div className="flex items-start justify-center gap-4 w-full max-w-[400px] px-4 mb-4">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex-1 text-center"
        >
          <p className="font-inter text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1">
            {challengerData.name}
          </p>
          <p className="font-oswald text-xl font-black uppercase text-white leading-tight">
            {theirPersona.stage}
          </p>
          <p className="font-inter text-[10px] font-bold text-orange uppercase tracking-wider">
            {theirPersona.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex-1 text-center"
        >
          <p className="font-inter text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1">
            {myData.name}
          </p>
          <p className="font-oswald text-xl font-black uppercase text-white leading-tight">
            {myPersona.stage}
          </p>
          <p className="font-inter text-[10px] font-bold text-orange uppercase tracking-wider">
            {myPersona.title}
          </p>
        </motion.div>
      </div>

      {/* Score-based message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="font-inter text-xs text-white/60 italic text-center px-8 mb-4 max-w-[400px]"
      >
        &ldquo;{getScoreMessage(score, challengerData.name, myData.name)}&rdquo;
      </motion.p>

      {/* Mutual sets */}
      {mutualArtists.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="w-full max-w-[400px] px-4 mb-3"
        >
          <Divider text={`${mutualArtists.length} Mutual Set${mutualArtists.length === 1 ? '' : 's'}`} />
          <div className="flex flex-wrap justify-center gap-2">
            {mutualArtists.map((artist) => (
              <span
                key={artist.id}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-inter text-[11px] font-bold text-white"
              >
                {artist.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {mutualArtists.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-inter text-[11px] text-white/30 italic mb-3"
        >
          No overlapping picks — you&apos;ll be discovering each other&apos;s taste all weekend
        </motion.p>
      )}

      {/* Actions — primary CTA first, matching ResultScreen order */}
      <button
        onClick={handleCopyLink}
        className="px-10 py-3 text-white font-black uppercase rounded-full transition-all hover:scale-105 active:scale-95 bg-orange"
        style={{ letterSpacing: '0.1em', fontSize: '12px', boxShadow: '0 0 15px rgba(255,92,0,0.4)' }}
      >
        {copied ? 'Link Copied!' : 'Challenge Another Friend'}
      </button>

      <button
        onClick={onShareCard}
        className="mt-2 px-8 py-2.5 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] rounded-full transition-all active:scale-95 hover:bg-white/15"
      >
        Export Share Card
      </button>
    </div>
  );
}
