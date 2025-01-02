import { useLoaderData } from 'react-router-dom';
import { useContext, memo } from 'react';
import { GameContext } from '../../context/GameContext.tsx';
import LevelPickerPanelCard from './LevelPickerPanelCard.tsx';
import { Challenge } from '../../types';

const LevelPickerPanel = () => {
  const challenges = useLoaderData<Challenge[]>();
  const context = useContext(GameContext);
  const highscores = context?.highscores ?? {};
  const LevelPickerPanelCardMemo = memo(LevelPickerPanelCard);

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-8 mx-auto max-w-[90%]">
      {challenges.map((challenge: Challenge) => {
        return (
          <LevelPickerPanelCardMemo
            key={challenge.id}
            challenge={challenge}
            highscores={highscores}
          />
        );
      })}
    </div>
  );
};

export default LevelPickerPanel;
