import { useEffect, useRef, useCallback, useState } from 'react';
import PhoneFrame from './components/layout/PhoneFrame';
import StartScreen from './components/screens/StartScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
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
import CompareScreen from './components/screens/CompareScreen';
import { useQuiz, SCREENS } from './hooks/useQuiz';
import { decodeQuizState, decodeChallengeData, parseChallengeParam } from './utils/shareUrl';
import { savePlayer, getPlayer } from './lib/players';
import { useAmbientAudio } from './hooks/useAmbientAudio';
import { trackScreen } from './lib/tracking';

function App() {
  const quiz = useQuiz();
  const screenBackRef = useRef(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const { muted, toggle: toggleAudio } = useAmbientAudio();

  // Track screen views for drop-off analysis
  useEffect(() => {
    trackScreen(quiz.currentScreen);
  }, [quiz.currentScreen]);

  const handleBack = useCallback(() => {
    if (screenBackRef.current) {
      screenBackRef.current();
    } else {
      quiz.prevScreen();
    }
  }, [quiz.prevScreen]);

  // Parse challenge URL on mount — supports both ?c=<id> and legacy ?challenge=<base64>
  useEffect(() => {
    const challenge = parseChallengeParam();
    if (challenge) {
      if (challenge.type === 'id') {
        getPlayer(challenge.value)
          .then((player) => {
            if (player) {
              quiz.setChallenger({
                name: player.name,
                personaId: player.persona_id,
                dayPicks: player.day_picks || [],
              });
            }
          })
          .catch(() => { /* challenger load failed — user can still take quiz solo */ });
      } else {
        const challenger = decodeChallengeData(challenge.value);
        if (challenger) quiz.setChallenger(challenger);
      }
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
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
        return <StartScreen onStart={() => { if (muted) toggleAudio(); quiz.nextScreen(); }} playerName={quiz.playerName} onNameChange={quiz.setPlayerName} />;
      case SCREENS.WELCOME:
        return <WelcomeScreen playerName={quiz.playerName} onComplete={quiz.nextScreen} />;
      case SCREENS.HEADLINER:
        return <HeadlinerShowdown onComplete={(id, w) => handleScreenComplete('headliner', id, w)} />;
      case SCREENS.THIS_OR_THAT:
        return <ThisOrThat onComplete={(id, w) => handleScreenComplete('thisOrThat', id, w)} backRef={screenBackRef} onBack={quiz.prevScreen} />;
      case SCREENS.SWIPE:
        return <SwipeOrSkip onComplete={(id, w) => handleScreenComplete('swipe', id, w)} />;
      case SCREENS.DAY_DRAFT:
        return <DayDraft onComplete={(id, w) => handleScreenComplete('dayDraft', id, w)} onDayPicks={quiz.setDayPicks} backRef={screenBackRef} onBack={quiz.prevScreen} />;
      case SCREENS.GENRE:
        return <GenreSpectrum onComplete={(id, w) => handleScreenComplete('genre', id, w)} backRef={screenBackRef} onBack={quiz.prevScreen} />;
      case SCREENS.VIBE_CHECK:
        return <VibeCheckScreen onComplete={(id, w) => handleScreenComplete('vibeCheck', id, w)} backRef={screenBackRef} onBack={quiz.prevScreen} />;
      case SCREENS.HOT_TAKES:
        return <HotTakes onComplete={(id, w) => handleScreenComplete('hotTakes', id, w)} backRef={screenBackRef} onBack={quiz.prevScreen} />;
      case SCREENS.LOADING:
        return <LoadingScreen onComplete={quiz.nextScreen} playerName={quiz.playerName} />;
      case SCREENS.RESULT:
        return (
          <ResultScreen
            personaId={quiz.personaId}
            playerName={quiz.playerName}
            scores={quiz.scores}
            dayPicks={quiz.dayPicks}
            challenger={quiz.challenger}
            myPlayerId={myPlayerId}
            onPlayerSaved={setMyPlayerId}
            onShareCard={() => quiz.goToScreen(SCREENS.SHARE)}
            onCompare={quiz.challenger ? () => quiz.goToScreen(SCREENS.COMPARE) : null}
            onRestart={quiz.restart}
          />
        );
      case SCREENS.COMPARE:
        return (
          <CompareScreen
            myData={{ name: quiz.playerName, personaId: quiz.personaId, dayPicks: quiz.dayPicks }}
            challengerData={quiz.challenger}
            myPlayerId={myPlayerId}
            onShareCard={() => quiz.goToScreen(SCREENS.SHARE)}
          />
        );
      case SCREENS.SHARE:
        return (
          <ShareCard
            personaId={quiz.personaId}
            playerName={quiz.playerName}
            scores={quiz.scores}
            dayPicks={quiz.dayPicks}
            onBack={() => quiz.goToScreen(quiz.challenger ? SCREENS.COMPARE : SCREENS.RESULT)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PhoneFrame showHeader={!hideChrome} showFooter={!hideChrome} currentScreen={quiz.currentScreen} onBack={handleBack} onRestart={quiz.restart} audioMuted={muted} onToggleAudio={toggleAudio}>
      {renderScreen()}
    </PhoneFrame>
  );
}

export default App;
