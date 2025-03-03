import './Log.scss';

interface LogProps {
  turns: {
    square: {
      row: number;
      col: number;
    };
    player: 'X' | 'O';
  }[];
}

export function Log({ turns }: LogProps) {
  return (
    <ol className='ttt-log__list' id="ttt-log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}