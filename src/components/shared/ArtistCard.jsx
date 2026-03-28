export default function ArtistCard({ artist, isSelected, isDeselected, onSelect }) {
  const glowStyle = isSelected
    ? { boxShadow: '0 0 40px rgba(255, 92, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)', transform: 'scale(1.05)', borderColor: '#ff5c00' }
    : isDeselected
    ? { transform: 'scale(0.95)', opacity: 0.4 }
    : {};

  return (
    <div
      className="relative w-[240px] h-[360px] shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 bg-[#121212] flex flex-col justify-end border-[1.5px] border-white/10"
      style={glowStyle}
      onClick={onSelect}
    >
      {artist.image && (
        <img
          src={artist.image}
          alt={artist.name.join(' ')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-tr ${artist.gradient} opacity-40 mix-blend-screen transition-transform duration-700 ${isSelected ? 'scale-110' : ''}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border text-[8px] font-bold tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 whitespace-nowrap z-20 ${
          isSelected ? 'bg-orange text-white border-transparent' : 'bg-black/20 text-white/80 border-white/30'
        }`}
        style={isSelected ? { boxShadow: '0 0 10px rgba(255,92,0,0.8)' } : {}}
      >
        {isSelected ? 'Selected' : 'Not Selected'}
      </div>

      <div className="relative z-10 p-5 w-full text-center pb-8">
        <h3
          className="font-oswald text-4xl font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
          style={{ transform: 'scaleY(1.15)' }}
        >
          {artist.name.map((line, i) => (
            <span key={i}>
              {line}
              {i < artist.name.length - 1 && <br />}
            </span>
          ))}
        </h3>
      </div>
    </div>
  );
}
