export default function Header() {
  return (
    <header className="w-full pt-8 pb-2 px-4 flex flex-col items-center z-20 shrink-0">
      <p className="text-[7px] tracking-[0.25em] text-gray-300 font-bold uppercase opacity-80 mb-1">
        Goldenvoice Presents In Indio
      </p>
      <h1
        className="font-oswald text-4xl font-black uppercase leading-none text-center text-white"
        style={{
          transform: 'scaleY(1.1)',
          letterSpacing: '0.08em',
        }}
      >
        Vibecheck
      </h1>
      <p className="text-[6px] tracking-[0.3em] text-gray-300 mt-2 font-bold uppercase opacity-80 text-center">
        Coachella Valley Music And Arts Festival
      </p>
    </header>
  );
}
