import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getPersona } from '../../data/personas';
import { calculateChemistry } from '../../data/chemistry';
import { buildChallengeUrl } from '../../utils/shareUrl';

export default function CompareScreen({ myData, challengerData, onShareCard, onChallenge }) {
  const myPersona = getPersona(myData.personaId);
  const theirPersona = getPersona(challengerData.personaId);

  const { score, mutualArtists, blurb } = useMemo(
    () => calculateChemistry(myData, challengerData),
    [myData, challengerData],
  );

  const handleCopyLink = () => {
    const url = buildChallengeUrl({
      name: myData.name,
      personaId: myData.personaId,
      dayPicks: myData.dayPicks,
    });
    navigator.clipboard.writeText(url).then(() => {
      if (onChallenge) onChallenge();
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
      {/* Chemistry Score */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="text-center mb-4"
      >
        <p className="font-inter text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase mb-1">
          Coachella Chemistry
        </p>
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

        <span className="font-oswald text-lg font-black text-white/30 mt-4">×</span>

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

      {/* Compatibility blurb */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="font-inter text-xs text-white/60 italic text-center px-8 mb-4 max-w-[400px]"
      >
        &ldquo;{blurb}&rdquo;
      </motion.p>

      {/* Mutual sets */}
      {mutualArtists.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="w-full max-w-[400px] px-4 mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-inter text-[9px] font-bold tracking-[0.2em] text-accent-teal uppercase">
              Mutual Sets
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
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
          className="font-inter text-[11px] text-white/30 italic mb-4"
        >
          No overlapping picks — you&apos;ll be discovering each other&apos;s taste all weekend
        </motion.p>
      )}

      {/* Actions */}
      <div className="flex flex-col items-center gap-3 mt-2 shrink-0 pb-4">
        <button
          onClick={onShareCard}
          className="px-10 py-3 bg-orange text-white font-black uppercase tracking-widest text-xs rounded-full transition-transform active:scale-95 hover:scale-105"
          style={{ boxShadow: '0 0 15px rgba(255,92,0,0.4)' }}
        >
          Export Share Card
        </button>
        <button
          onClick={handleCopyLink}
          className="px-8 py-2.5 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] rounded-full transition-all active:scale-95 hover:bg-white/15"
        >
          Challenge Another Friend
        </button>
      </div>
    </div>
  );
}
