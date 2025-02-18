import { lazy, memo, useContext, useEffect } from 'react';
import { GameContext } from '@context/GameContext/GameContext.tsx';
import { Footer } from '@components/Footer.tsx';
import { useAuth } from '@hooks/useAuth.tsx';
import { useDocumentTitle } from '@hooks/useDocumentTitle.tsx';
import type { Challenges, HighscoresByChallenge } from '@typings/index';
import { useNavigate } from 'react-router-dom';

const LevelPickerPanelCard = lazy(
  () => import('../components/LevelPickerPanelCard.tsx')
);
const LevelPickerPanelLoadingCard = lazy(
  () => import('../components/LevelPickerPanelLoadingCard.tsx')
);

const LevelPickerPanel: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading: authLoading } = useAuth();
  const context = useContext(GameContext);
  useDocumentTitle('Challenges', { suffix: '- MIND MELD' });

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, authLoading, navigate]);

  if (!currentUser) {
    return null;
  }

  const challenges: Challenges = context?.state.challenges ?? [];
  const highscores: HighscoresByChallenge = context?.state.highscores ?? {
    easy: [],
    medium: [],
    hard: [],
  };

  const LevelPickerPanelCardMemo = memo(
    LevelPickerPanelCard,
    (prev, next) =>
      prev.challenge.id === next.challenge.id &&
      prev.highscores === next.highscores
  );

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-[90%] mb-14 md:mb-24">
        {challenges.length === 0 ? (
          <>
            {[...Array(3)].map((_, index) => (
              <LevelPickerPanelLoadingCard key={`loading-${index}`} />
            ))}
          </>
        ) : !challenges ? (
          <p className="text-lg font-mono col-span-full text-center text-white ">
            No challenges available
          </p>
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
