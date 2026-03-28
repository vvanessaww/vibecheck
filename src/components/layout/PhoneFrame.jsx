import Header from './Header';
import Footer from './Footer';

const QUIZ_SCREENS = ['headliner', 'thisOrThat', 'dayDraft', 'genre', 'vibeCheck', 'hotTakes'];

export default function PhoneFrame({ children, showHeader = true, showFooter = true, currentScreen, onBack }) {
  const quizIndex = QUIZ_SCREENS.indexOf(currentScreen);
  const isQuizScreen = quizIndex !== -1;
  const progress = isQuizScreen ? ((quizIndex + 1) / QUIZ_SCREENS.length) * 100 : 0;

  return (
    <div className="relative w-full min-h-dvh bg-gradient-to-b from-teal-dark via-teal-mid to-purple-dark flex flex-col font-inter overflow-hidden">
      {showHeader && <Header />}

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

      <main className="relative z-20 flex-1 w-full px-5 py-2 flex flex-col justify-center overflow-hidden pb-32">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
