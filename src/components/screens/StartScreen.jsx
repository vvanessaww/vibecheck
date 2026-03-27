import Divider from '../layout/Divider';

export default function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center" style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
      <h2
        className="font-oswald text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-2"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        Find Your
      </h2>
      <h2
        className="font-oswald text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-8 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent"
        style={{ animation: 'float 4s ease-in-out infinite' }}
      >
        Inner Headliner
      </h2>

      <div className="text-center space-y-3 px-2">
        <p className="font-inter font-bold text-sm text-gray-300 tracking-tight uppercase">
          Discover which festival persona takes the main stage in your soul.
        </p>
        <Divider text="7 Stages • 1 Persona" />
      </div>

      <button
        onClick={onStart}
        className="mt-12 group relative px-8 py-3 bg-white text-teal-dark font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-transform active:scale-95 hover:scale-105"
      >
        Start The Quiz
      </button>
    </div>
  );
}
