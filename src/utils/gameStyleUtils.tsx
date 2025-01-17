enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

const difficultyClassMap: Record<Difficulty, { text: string; bg: string }> = {
  [Difficulty.easy]: {
    text: 'text-challenge-levelEasy',
    bg: 'bg-challenge-levelEasy',
  },
  [Difficulty.medium]: {
    text: 'text-challenge-levelMedium',
    bg: 'bg-challenge-levelMedium',
  },
  [Difficulty.hard]: {
    text: 'text-challenge-levelHard',
    bg: 'bg-challenge-levelHard',
  },
};

const medalScoreTimeColors: { [key: number]: string } = {
  0: 'text-challenge-text',
  1: 'text-accentRed',
  2: 'text-accentOrange',
  3: 'text-accentGreen',
};

export { difficultyClassMap, medalScoreTimeColors };
