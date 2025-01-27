import { useContext } from 'react';
import { GameContext } from '../../context/GameContext.tsx';
import LevelPickerPanelCard from './LevelPickerPanelCard.tsx';
import { Challenges, HighscoresByChallenge } from '../../types/index.ts';
import { memo } from 'react';
import LevelPickerPanelLoadingCard from './LevelPickerPanelLoadingCard.tsx';
import Footer from '../../components/Footer.tsx';
const LevelPickerPanel = () => {
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
      <Footer />
    </>
  );
};

export default LevelPickerPanel;
