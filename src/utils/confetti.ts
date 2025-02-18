import confetti from 'canvas-confetti';

export function runConfetti() {
  const duration = 0.9 * 1000;
  const end = Date.now() + duration;

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      particleCount,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: randomInRange(0.2, 0.8),
        y: randomInRange(0.2, 0.4),
      },
    });
  }, 200);
}
