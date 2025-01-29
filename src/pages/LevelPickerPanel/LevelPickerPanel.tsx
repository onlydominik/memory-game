import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../context/GameContext.tsx';
import LevelPickerPanelCard from './LevelPickerPanelCard.tsx';
import { Challenges, HighscoresByChallenge } from '../../types/index.ts';
import { memo } from 'react';
import LevelPickerPanelLoadingCard from './LevelPickerPanelLoadingCard.tsx';
import Footer from '../../components/Footer.tsx';
import { useAuth } from '../../hooks/useAuth.tsx';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.ts';
import { doSignOut } from '../../firebase/auth.ts';

const LevelPickerPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GameContext);
  const challenges: Challenges = context?.state.challenges ?? [];
  const highscores: HighscoresByChallenge = context?.state.highscores ?? {
    easy: [],
    medium: [],
    hard: [],
  };
  const LevelPickerPanelCardMemo = memo(
    LevelPickerPanelCard,
    (prevProps, nextProps) =>
      prevProps.challenge.id === nextProps.challenge.id &&
      prevProps.highscores === nextProps.highscores
  );
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-[90%] mb-8">
        {challenges.length === 0 ? (
          <>
            <LevelPickerPanelLoadingCard />
            <LevelPickerPanelLoadingCard />
            <LevelPickerPanelLoadingCard />
          </>
        ) : (
          challenges.map((challenge) => {
            return (
              <LevelPickerPanelCardMemo
                key={challenge.id}
                challenge={challenge}
                highscores={highscores}
              />
            );
          })
        )}
      </div>
      <h1>
        Logout <button onClick={doSignOut}>sign out</button>
      </h1>
      <Footer />
    </>
  );
};

export default LevelPickerPanel;
