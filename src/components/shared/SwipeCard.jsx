import { useSwipe } from '../../hooks/useSwipe';

export default function SwipeCard({
  children,
  position,
  onSwipeComplete,
  leftLabel = 'NAH',
  rightLabel = 'YEA!',
  leftColor = 'rgba(10, 61, 71, 0.6)',
  leftBorder = '#4bb8cc',
  leftTextColor = '#4bb8cc',
  rightColor = 'rgba(255, 0, 122, 0.4)',
  rightBorder = '#ff007a',
  rightTextColor = 'white',
}) {
  const { cardRef, overlayLeftRef, overlayRightRef, touchHandlers, mouseHandlers } = useSwipe({ onSwipeComplete });

  const positionStyles = {
    1: { zIndex: 3, transform: 'translateZ(0) scale(1)', opacity: 1 },
    2: { zIndex: 2, transform: 'translateZ(-50px) translateY(15px) scale(0.92)', opacity: 0.6 },
    3: { zIndex: 1, transform: 'translateZ(-100px) translateY(30px) scale(0.85)', opacity: 0.3 },
  };

  if (position !== 1) {
    return (
      <div
        className="absolute w-full h-full rounded-3xl bg-teal-card border border-white/10"
        style={{ ...positionStyles[position], transition: 'transform 0.4s ease, opacity 0.4s ease', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
      >
        <div className="w-full h-full bg-white/5 rounded-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="absolute w-full h-full rounded-3xl bg-teal-card border border-white/10 flex flex-col items-center justify-center p-8 text-center cursor-grab select-none"
      style={{ ...positionStyles[1], transition: 'transform 0.4s ease, opacity 0.4s ease', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', animation: 'fadeIn 0.3s ease-out' }}
      {...touchHandlers}
      {...mouseHandlers}
    >
      <div
        ref={overlayRightRef}
        className="absolute inset-0 rounded-3xl flex items-center justify-center pointer-events-none z-10"
        style={{ background: rightColor, border: `4px solid ${rightBorder}`, opacity: 0, transition: 'opacity 0.2s ease' }}
      >
        <span className="font-oswald text-4xl font-black italic" style={{ color: rightTextColor }}>{rightLabel}</span>
      </div>
      <div
        ref={overlayLeftRef}
        className="absolute inset-0 rounded-3xl flex items-center justify-center pointer-events-none z-10"
        style={{ background: leftColor, border: `4px solid ${leftBorder}`, opacity: 0, transition: 'opacity 0.2s ease' }}
      >
        <span className="font-oswald text-4xl font-black italic" style={{ color: leftTextColor }}>{leftLabel}</span>
      </div>

      {children}

      <div className="w-12 h-1 bg-white/20 rounded-full mt-6" />
    </div>
  );
}
