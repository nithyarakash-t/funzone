import { useState, ChangeEvent } from 'react';
import './Player.scss';

interface PlayerProps {
  initialName: string;
  symbol: 'X' | 'O';
  isActive: boolean;
  onChangeName: (symbol: 'X' | 'O', newName: string) => void;
}

export function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}: PlayerProps) {
  const [playerName, setPlayerName] = useState<string>(initialName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditClick(): void {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}