import Header from './Header';
import Footer from './Footer';
import Sky from './Sky';

const QUIZ_SCREENS = ['headliner', 'thisOrThat', 'genre', 'vibeCheck', 'hotTakes', 'dayDraft'];

export default function PhoneFrame({ children, showHeader = true, showFooter = true, currentScreen, onBack, audioMuted, onToggleAudio }) {
  const quizIndex = QUIZ_SCREENS.indexOf(currentScreen);
  const isQuizScreen = quizIndex !== -1;
  const progress = isQuizScreen ? ((quizIndex + 1) / QUIZ_SCREENS.length) * 100 : 0;

  return (
    <div className="relative w-full h-dvh flex flex-col font-inter overflow-hidden">
      <Sky />
      {showHeader && <Header />}

      {onToggleAudio && (
        <button
          onClick={onToggleAudio}
          className="fixed top-[env(safe-area-inset-top,12px)] right-3 z-50 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
          style={{ marginTop: '8px' }}
          aria-label={audioMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
        >
          {audioMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      )}

      {isQuizScreen && (
        <div className="w-full max-w-[600px] mx-auto px-5 flex items-center gap-3 z-20 shrink-0 pt-1 pb-2">
          <button
            onClick={onBack}
            className="text-white/50 hover:text-white transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[9px] text-white/40 font-bold tracking-wider shrink-0">
            {quizIndex + 1}/{QUIZ_SCREENS.length}
          </span>
        </div>
      )}

      <main className="relative z-20 flex-1 w-full px-5 py-2 flex flex-col justify-center overflow-hidden pb-32 pointer-events-none [&>*]:pointer-events-auto">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
