export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full h-[35%] pointer-events-none z-10 flex flex-col justify-end">
      <div className="absolute bottom-12 w-full h-40 bg-gradient-to-t from-orange-red to-transparent opacity-60 mix-blend-overlay" />
      <svg
        className="absolute bottom-8 w-full h-32"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 L0,50 L40,30 L80,60 L130,20 L180,70 L240,10 L300,60 L350,30 L400,80 L400,100 Z"
          fill="#b32400"
          opacity="0.8"
        />
        <path
          d="M0,100 L20,70 L60,40 L110,80 L160,30 L210,60 L270,20 L330,70 L380,40 L400,90 L400,100 Z"
          fill="#ff5c00"
          opacity="0.9"
        />
      </svg>
      <div className="w-full h-8 bg-grass border-t-[0.5px] border-grass-border relative z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#112e1a] mix-blend-multiply" />
      </div>
      <div className="absolute bottom-1 w-full text-center z-30 pb-1">
        <p className="text-[8px] text-white/60 tracking-[0.15em] font-bold">
          made with &lt;3 by vanessa
        </p>
      </div>
    </footer>
  );
}
