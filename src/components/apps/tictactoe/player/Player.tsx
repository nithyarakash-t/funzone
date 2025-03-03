import { useState, ChangeEvent } from 'react';
import { PlayerProps } from '../types';
import './Player.scss';

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

  let editablePlayerName = <span className="ttt-player__name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="ttt-player__wrap">
        {editablePlayerName}
        <span className="ttt-player__symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}