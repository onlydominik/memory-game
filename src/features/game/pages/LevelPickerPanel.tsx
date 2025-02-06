import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../context/GameContext.tsx';
import LevelPickerPanelCard from '../components/LevelPickerPanelCard.tsx';
import { Challenges, HighscoresByChallenge } from '../../../types/index.ts';
import { memo } from 'react';
import LevelPickerPanelLoadingCard from '../components/LevelPickerPanelLoadingCard.tsx';
import Footer from '../../../components/Footer.tsx';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../services/firebase/firebase.ts';

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

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-[90%] mb-14 md:mb-24">
        {challenges.length === 0 || isLoading ? (
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

      <Footer />
    </>
  );
};

export default LevelPickerPanel;
