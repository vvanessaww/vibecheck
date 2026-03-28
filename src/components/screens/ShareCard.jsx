import { getPersona } from '../../data/personas';
import { exportCardAsImage } from '../../utils/exportImage';

export default function ShareCard({ personaId, onBack }) {
  const persona = getPersona(personaId);

  const handleSave = () => {
    exportCardAsImage('share-card');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <div
        id="share-card"
        className="w-full max-w-[300px] mx-auto relative overflow-hidden flex flex-col px-8 py-6 items-center text-center shadow-2xl"
        style={{
          aspectRatio: '9 / 16',
          backgroundColor: '#0c2a30',
          border: '2px solid rgba(75,184,204,0.3)',
        }}
      >
        {/* Top branding */}
        <div className="z-10 w-full flex flex-col items-center mb-auto">
          <p className="font-bold uppercase" style={{ fontSize: '6px', letterSpacing: '0.3em', color: '#4bb8cc' }}>
            The 2026 Vibecheck Results
          </p>
          <h3
            className="font-oswald font-black uppercase text-white"
            style={{ fontSize: '24px', letterSpacing: '-0.05em', lineHeight: 1, animation: 'glow 2s ease-in-out infinite alternate' }}
          >
            Vibecheck
          </h3>
        </div>

        {/* Persona + confirmed vibe grouped together */}
        <div className="z-10 flex flex-col items-center">
          <p className="font-caveat" style={{ color: '#ff5c00', fontSize: '22px', transform: 'rotate(-6deg)', marginBottom: '6px' }}>
            My Festival Persona:
          </p>
          <h2
            className="font-oswald font-black uppercase text-white"
            style={{ fontSize: '34px', letterSpacing: '-0.05em', lineHeight: '0.85' }}
          >
            {persona.title.replace('The ', '')}
          </h2>
          <p className="font-inter font-black uppercase mt-2 mb-3" style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)' }}>
            {persona.subtitle}
          </p>

          {/* Confirmed vibe - directly below subtitle */}
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex-1" style={{ height: '1px', backgroundColor: 'rgba(75,184,204,0.4)' }} />
              <span className="font-bold uppercase" style={{ fontSize: '8px', color: '#4bb8cc', letterSpacing: '0.15em' }}>
                Confirmed Vibe
              </span>
              <div className="flex-1" style={{ height: '1px', backgroundColor: 'rgba(75,184,204,0.4)' }} />
            </div>
            <div className="flex flex-wrap justify-center items-center" style={{ gap: '6px' }}>
              {persona.traits.slice(0, 4).map((trait, i) => (
                <span key={trait}>
                  <span className="font-inter font-black uppercase text-white" style={{ fontSize: '10px', letterSpacing: '-0.02em' }}>
                    {trait}
                  </span>
                  {i < 3 && <span className="text-white/30 text-[8px] mx-1">&bull;</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="mb-auto" />

        {/* Background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '256px', height: '256px',
              backgroundColor: 'rgba(255,92,0,0.1)',
              filter: 'blur(60px)',
            }}
          />
          <svg className="absolute bottom-0 left-0 w-full h-24" style={{ opacity: 0.4 }} viewBox="0 0 400 100" preserveAspectRatio="none">
            <path d="M0,100 L0,40 L100,20 L200,60 L300,10 L400,50 L400,100 Z" fill="#ff5c00" />
          </svg>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-[300px]">
        <button
          onClick={handleSave}
          className="w-full font-black py-4 rounded-full uppercase text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 bg-white text-teal-dark"
          style={{ letterSpacing: '0.1em' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save to Camera Roll
        </button>
        <button
          onClick={onBack}
          className="font-bold uppercase text-white/60 transition-opacity hover:opacity-80"
          style={{ fontSize: '10px', letterSpacing: '0.2em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}
        >
          Back to Result
        </button>
      </div>
    </div>
  );
}
