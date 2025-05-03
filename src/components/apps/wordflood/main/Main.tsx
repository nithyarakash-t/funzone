import { Fragment, useEffect, useState } from 'react';
import wordList from 'an-array-of-english-words';
import './Main.scss';
import { fillMatrixWithRandomLetters, fillMatrixWithVowelWeightedLetters, fillSingleCellWithRandomLetter, fillSingleCellWithVowelWeightedLetter, formatTime } from '../utils';

const INITIAL_MATRIX_STATE:(string | null)[][] = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
]
const TEST_MATRIX_STATE:(string | null)[][] = [
    ['a', 'b', 'c', 'e', 'x', 'z'],
    ['l', 'a', 't', 't', 'p', 'o'],
    ['i', 'q', 'w', 'e', 'r', 't'],
    ['y', 'u', 'i', 'o', 's','d'],
    ['f', 'g', 'h', 'j', 'l', 'k'],
    ['a', 'x', 'c', 'v', 'b', 'n']
]
const ALLOWED_ROWS = 6, ALLOWED_COLS = 6;
const WORD_SET = new Set(wordList);
const MULTIPLIER = 10; //10 points per letter in word
const INTERVAL = 1500; // 5s interval during death mode - progressively decreses based on score till it reaches 1s

export function Main() {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [gamestate, setGameState] = useState< 'yettostart' | 'running' | 'stopped'>('yettostart');
    const [matrix, setMatrix] = useState(TEST_MATRIX_STATE);
    const [letterQueue, setLetterQueue] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [mode, setMode] = useState<'SetGame' | 'DeathGame'>('SetGame');
    const [difficulty, setDifficulty] = useState<'Easy' | 'Hard'>('Easy');

    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [filledCellCount, setFilledCellCount] = useState<number>(0);
    const totalCells = ALLOWED_ROWS * ALLOWED_COLS;

    //Handles DeathMode progression
    useEffect(() => {
        let fillInterval: number | undefined;
    
        if (gamestate === 'running' && !isValidating && mode === 'DeathGame') {
            console.info('Managing Death mode progression'); //Setmode is completely handled in startGame
        
            fillInterval = window.setInterval(() => {
                // game ends when all cells are filled
                if (filledCellCount >= totalCells) {
                    clearInterval(fillInterval);
                    endGame();
                    return;
                }
                
                setMatrix(prevMatrix => {
                    const newMatrix = difficulty === 'Easy' 
                        ? fillSingleCellWithVowelWeightedLetter(prevMatrix)
                        : fillSingleCellWithRandomLetter(prevMatrix);
                    
                    return newMatrix;
                });
                
                setFilledCellCount(prev => prev + 1);
                
            }, INTERVAL);
        }
    
        return () => {
            if (fillInterval) {
                clearInterval(fillInterval);
            }
        };
    }, [gamestate, mode, difficulty, filledCellCount, totalCells, isValidating]);

    // Timer effect - runs when game is in 'running' state
    useEffect(() => {
        let timerInterval: number | undefined;
        
        if (gamestate === 'running') {
            timerInterval = window.setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        }
        
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [gamestate]);
  

    //reset and start game
    function startGame() {
       // Set initial game state
        setGameState('running');
        setFoundWords([]);
        setScore(0);
        clearLetterQueue();
        setElapsedTime(0);
        
        // Initialize matrix and cell count based on game mode
        if (mode === 'SetGame') {
            if (difficulty === 'Easy') {
                setMatrix(fillMatrixWithVowelWeightedLetters(ALLOWED_ROWS, ALLOWED_COLS));
            } else {
                setMatrix(fillMatrixWithRandomLetters(ALLOWED_ROWS, ALLOWED_COLS));
            }
            setFilledCellCount(totalCells);
        } else {
            setMatrix(INITIAL_MATRIX_STATE);
            setFilledCellCount(0);
        }
    }
    //end current game - user is allowed to view the last game's data so no reset
    function endGame() {
        setGameState('stopped');
    }
    // clear selected letter queue
    function clearLetterQueue() {
        setLetterQueue([]);
    }
    // submit word for check
    function submitWord() {
        if(letterQueue.length < 1) return;

        setIsValidating(true);
        const WORD = letterQueue
                    .map(rowcell => {
                        const [row, col] = rowcell.split('-').map(Number);
                        return matrix[row][col];
                    })
                    .join('');
        const FLAG = isValidEnglishWord(WORD);
        console.log("Is the word valid - ", FLAG);

        if(FLAG) {
            const NEW_MATRIX = structuredClone(matrix);
            letterQueue.forEach((rowcell)=>{
                const [row, col] = rowcell.split('-').map(Number);
                NEW_MATRIX[row][col] = null;
            })

            setFilledCellCount(prev => prev - letterQueue.length);
            setFoundWords([...foundWords, WORD]);
            setScore((prev)=>prev + (WORD.length * MULTIPLIER));
            setMatrix(NEW_MATRIX);
            clearLetterQueue();
        }
        else {
            console.log('Not a word dumbass, try harder');
        }

        setIsValidating(false);
    }
    // toggle cell - select / de-select
    function handleCellClick(input:(string)) {
        // const [ROW_INDEX, CELL_INDEX] = input.split('-');
        // console.log(ROW_INDEX, CELL_INDEX);
        let newLetterQueue = structuredClone(letterQueue);

        if(letterQueue.indexOf(input) !== -1) {
            const index = letterQueue.indexOf(input);
            newLetterQueue = [...newLetterQueue.slice(0, index), ...newLetterQueue.slice(index + 1)];
        }
        else {
            newLetterQueue.push(input);
        }

        setLetterQueue(newLetterQueue);
    }
    // Is word valid ?
    function isValidEnglishWord(word: string): boolean {
        return WORD_SET.has(word.toLowerCase());
    }

     return(
        <div className='wf-app__main'>
            <div className="wf-app__timer">Time: {formatTime(elapsedTime)}</div>
            <p>Game status - {gamestate}</p>
            {
                mode==='DeathGame' && <p className='wf-app__progress' style={{'--_progress': `${(filledCellCount / totalCells) * 100}%`} as React.CSSProperties}>Flood Progress - {filledCellCount}/{totalCells}</p>
            }
            <div className='wf-app__selectwrap'>
                <select name='wf-app-difficulty' id='wf-app-difficulty' value={difficulty} 
                onChange={(e)=>setDifficulty(e.currentTarget.value as ('Easy' | 'Hard'))}
                disabled={gamestate === 'running'}>
                    <option value={'Easy'}>Easy</option>
                    <option value={'Difficult'}>Difficult</option>
                </select>
                <select name='wf-app-mode' id='wf-app-mode' value={mode}
                onChange={(e)=>setMode(e.currentTarget.value as ('SetGame' | 'DeathGame'))}
                disabled={gamestate === 'running'}>
                    <option value={'SetGame'}>SetGame</option>
                    <option value={'DeathGame'}>DeathGame</option>
                </select>
            </div>
            <div className='wf-grid__table' data-state={gamestate}>
                <table >
                    <caption className='sr-only'>Word flood table</caption>
                    <tbody>
                        {matrix.map((row, rowIndex)=>{
                            return <tr key={rowIndex}>
                                {row.map((cellValue, cellIndex)=>{
                                    const ROW_CELL = `${rowIndex}-${cellIndex}`;
                                    return <td key={cellIndex}>
                                        <div className='wf-grid__table-cell'>
                                            <button type='button' className='wf-grid__table-button' aria-label='Select - lorem' disabled={(cellValue === null || gamestate !== 'running') ? true : undefined} aria-selected={letterQueue.indexOf(ROW_CELL) !== -1} onClick={()=>handleCellClick(ROW_CELL)}>
                                                {cellValue}
                                            </button>
                                        </div>
                                    </td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <p className='wf-app__selection'>
                {letterQueue.map((item, index)=>{
                    const [ROW_INDEX, CELL_INDEX] = item.split('-');
                    return <Fragment key={index}>{matrix[parseInt(ROW_INDEX)][parseInt(CELL_INDEX)]}</Fragment>
                })}
            </p>
            <div className='wf-app__controlgroup'>
                <button type='button' className='wf-app__clear' aria-label='clear selection' disabled={gamestate !== 'running' || letterQueue.length === 0} onClick={clearLetterQueue}>Clear Queue</button>
                <button type='button' className='wf-app__submit' aria-label='submit word' disabled={gamestate !== 'running' || letterQueue.length === 0} onClick={submitWord}>Submit word</button>
            </div>
            <div className='wf-app__controlgroup'>
                <button type='button' className='wf-app__start' aria-label='start' disabled={gamestate === 'running'} onClick={startGame}>Start Game</button>
                <button type='button' className='wf-app__end' aria-label='end' disabled={gamestate !== 'running'} onClick={endGame}>End Game</button>
            </div>
            {
                foundWords.length > 0 
                &&
                <p className='wf-app__foundwords'>
                    {foundWords.map((item,ind)=>{
                        return <Fragment key={ind}>{item}, </Fragment>
                    })}
                </p>
            }
            <p className='wf-app__score'>SCORE - {score}</p>
        </div>
    )
}