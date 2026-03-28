import { useEffect } from 'react';
import PhoneFrame from './components/layout/PhoneFrame';
import StartScreen from './components/screens/StartScreen';
import HeadlinerShowdown from './components/screens/HeadlinerShowdown';
import ThisOrThat from './components/screens/ThisOrThat';
import SwipeOrSkip from './components/screens/SwipeOrSkip';
import DayDraft from './components/screens/DayDraft';
import GenreSpectrum from './components/screens/GenreSpectrum';
import VibeCheckScreen from './components/screens/VibeCheckScreen';
import HotTakes from './components/screens/HotTakes';
import LoadingScreen from './components/screens/LoadingScreen';
import ResultScreen from './components/screens/ResultScreen';
import ShareCard from './components/screens/ShareCard';
import { useQuiz, SCREENS } from './hooks/useQuiz';
import { decodeQuizState } from './utils/shareUrl';

function App() {
  const quiz = useQuiz();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('q');
    if (encoded) {
      const state = decodeQuizState(encoded);
      if (state && state.scores) {
        quiz.goToScreen(SCREENS.RESULT);
      }
    }
  }, []);

  const handleScreenComplete = (screenId, answerId, weights) => {
    quiz.recordAnswer(screenId, answerId, weights);
    quiz.nextScreen();
  };

  const hideChrome = quiz.currentScreen === SCREENS.SHARE;

  const renderScreen = () => {
    switch (quiz.currentScreen) {
      case SCREENS.START:
        return <StartScreen onStart={quiz.nextScreen} />;
      case SCREENS.HEADLINER:
        return <HeadlinerShowdown onComplete={(id, w) => handleScreenComplete('headliner', id, w)} />;
      case SCREENS.THIS_OR_THAT:
        return <ThisOrThat onComplete={(id, w) => handleScreenComplete('thisOrThat', id, w)} />;
      case SCREENS.SWIPE:
        return <SwipeOrSkip onComplete={(id, w) => handleScreenComplete('swipe', id, w)} />;
      case SCREENS.DAY_DRAFT:
        return <DayDraft onComplete={(id, w) => handleScreenComplete('dayDraft', id, w)} />;
      case SCREENS.GENRE:
        return <GenreSpectrum onComplete={(id, w) => handleScreenComplete('genre', id, w)} />;
      case SCREENS.VIBE_CHECK:
        return <VibeCheckScreen onComplete={(id, w) => handleScreenComplete('vibeCheck', id, w)} />;
      case SCREENS.HOT_TAKES:
        return <HotTakes onComplete={(id, w) => handleScreenComplete('hotTakes', id, w)} />;
      case SCREENS.LOADING:
        return <LoadingScreen onComplete={quiz.nextScreen} />;
      case SCREENS.RESULT:
        return (
          <ResultScreen
            personaId={quiz.personaId}
            onShareCard={() => quiz.goToScreen(SCREENS.SHARE)}
            onRestart={quiz.restart}
          />
        );
      case SCREENS.SHARE:
        return (
          <ShareCard
            personaId={quiz.personaId}
            onBack={() => quiz.goToScreen(SCREENS.RESULT)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PhoneFrame showHeader={!hideChrome} showFooter={!hideChrome}>
      {renderScreen()}
    </PhoneFrame>
  );
}

export default App;
