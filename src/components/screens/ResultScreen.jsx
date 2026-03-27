import Divider from '../layout/Divider';
import { getPersona } from '../../data/personas';
import { ARTIST_RECOMMENDATIONS } from '../../data/lineup';

export default function ResultScreen({ personaId, onShareCard, onRestart }) {
  const persona = getPersona(personaId);
  const recommendations = ARTIST_RECOMMENDATIONS[personaId] || [];

  return (
    <div className="flex flex-col items-center justify-start w-full pt-4 pb-20" style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
      <Divider text="Your Official Headliner" />

      <div className="text-center w-full mb-6">
        <h2
          className="font-oswald font-black uppercase text-white leading-[0.8] mb-2"
          style={{
            fontSize: '52px',
            letterSpacing: '-0.05em',
            transform: 'scaleY(1.1)',
            animation: 'glow 2s ease-in-out infinite alternate',
          }}
        >
          {persona.title.split(' ').map((word, i) => (
            <span key={i}>
              {word}
              {i < persona.title.split(' ').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="font-inter font-bold text-sm tracking-[0.1em] text-accent-teal uppercase mt-4 px-4 italic">
          &ldquo;{persona.subtitle}&rdquo;
        </p>
      </div>

      <Divider text="Featuring" />

      <div className="flex flex-wrap justify-center items-center px-4 mt-2 mb-8" style={{ gap: '4px 8px' }}>
        {persona.traits.slice(0, 4).map((trait, i) => (
          <span key={trait}>
            <span className="font-inter font-bold uppercase text-sm tracking-tight">{trait}</span>
            {i < 3 && <span className="text-white/50 text-[0.6em] mx-2 inline-block align-middle">&bull;</span>}
          </span>
        ))}
      </div>

      {recommendations.length > 0 && (
        <>
          <Divider text="Artists You'd Vibe With" />
          <div className="w-full px-4 mt-2 mb-8 flex flex-col gap-3">
            {recommendations.map((artist) => (
              <div
                key={artist.name}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="font-inter font-bold text-sm text-white">{artist.name}</span>
                  <span className="text-[0.6rem] text-accent-teal uppercase tracking-[0.15em] ml-2 font-inter">
                    {artist.stage}
                  </span>
                </div>
                <span className="text-[0.6rem] text-white/50 uppercase tracking-[0.1em] font-inter">
                  {artist.day}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={onShareCard}
        className="group relative px-10 py-4 text-white font-black uppercase rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl bg-orange"
        style={{ letterSpacing: '0.1em', fontSize: '12px' }}
      >
        Export Share Card
      </button>

      <button
        onClick={onRestart}
        className="mt-6 font-bold uppercase text-white/40 text-[10px] tracking-[0.2em] hover:text-white/60 transition-colors"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}
      >
        Retake Quiz
      </button>
    </div>
  );
}
