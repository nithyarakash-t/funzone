import './Gameboard.scss';

interface GameBoardProps {
  onSelectSquare: (row: number, col: number) => void;
  board: (null | 'X' | 'O')[][];
}

export function GameBoard({ onSelectSquare, board }: GameBoardProps) {
  return (
    <ol className='ttt-gameboard__wrap' id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}