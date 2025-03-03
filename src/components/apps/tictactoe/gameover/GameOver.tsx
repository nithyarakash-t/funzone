import { GameOverProps } from '../types';
import './Gameover.scss';

export function GameOver({ winner, onRestart }: GameOverProps) {
  return (
    <div className='ttt-gameover__wrap' id="ttt-game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}