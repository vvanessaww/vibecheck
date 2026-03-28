export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-10 flex flex-col justify-end">
      <div className="absolute bottom-12 w-full h-40 bg-gradient-to-t from-orange-red to-transparent opacity-60 mix-blend-overlay" />
      <svg
        className="absolute bottom-8 w-full h-32"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 L0,50 L60,30 L120,60 L200,20 L300,70 L400,10 L500,60 L600,30 L720,80 L840,20 L960,70 L1080,10 L1200,60 L1320,30 L1440,80 L1440,100 Z"
          fill="#b32400"
          opacity="0.8"
        />
        <path
          d="M0,100 L30,70 L90,40 L180,80 L270,30 L360,60 L480,20 L600,70 L720,30 L840,60 L960,20 L1080,70 L1200,40 L1320,90 L1440,50 L1440,100 Z"
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
