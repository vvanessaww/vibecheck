import PhoneFrame from './components/layout/PhoneFrame';
import SplashScreen from './components/screens/SplashScreen';
import StartScreen from './components/screens/StartScreen';
import { useQuiz, SCREENS } from './hooks/useQuiz';

function App() {
  const quiz = useQuiz();

  const renderScreen = () => {
    switch (quiz.currentScreen) {
      case SCREENS.START:
        return <StartScreen onStart={quiz.nextScreen} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-accent-teal tracking-widest uppercase text-xs font-bold">
              Screen: {quiz.currentScreen}
            </p>
            <button
              onClick={quiz.nextScreen}
              className="mt-4 px-6 py-2 bg-orange text-white rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        );
    }
  };

  return (
    <PhoneFrame showHeader={quiz.currentScreen !== SCREENS.SPLASH && quiz.currentScreen !== SCREENS.SHARE}>
      {quiz.currentScreen === SCREENS.SPLASH && (
        <SplashScreen onDismiss={quiz.nextScreen} />
      )}
      {renderScreen()}
    </PhoneFrame>
  );
}

export default App;
