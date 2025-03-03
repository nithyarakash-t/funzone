import { useState } from 'react';
import { Players, GameTurn, GameBoardType } from './types';

import { Player } from './player/Player';
import { GameBoard } from './gameboard/GameBoard';
import { Log } from './log/Log';
import { GameOver } from './gameover/GameOver';
import { WINNING_COMBINATIONS } from './winningCombinations';
import './Tictactoe.scss';

const PLAYERS: Players = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD: GameBoardType = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: GameTurn[]): 'X' | 'O' {
  let currentPlayer: 'X' | 'O' = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns: GameTurn[]): GameBoardType {
  const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard: GameBoardType, players: Players): string | undefined {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

export function Tictactoe() {
  const [players, setPlayers] = useState<Players>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number): void {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(): void {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: 'X' | 'O', newName: string): void {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <div className='app-grid'>
      <div className='ttt-game__container' id="game-container">
        <ol id="players" className="ttt-game__players highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </div>
  );
}
