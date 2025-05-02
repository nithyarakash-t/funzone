import { Fragment, useEffect, useState } from 'react';
import wordList from 'an-array-of-english-words';
import './Main.scss';
import { fillMatrixWithRandomLetters, fillMatrixWithVowelWeightedLetters, formatTime } from '../utils';

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
// const INTERVAL = 3000; // 5s interval during death mode - progressively decreses based on score till it reaches 1s

export function Main() {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [gamestate, setGameState] = useState< 'yettostart' | 'running' | 'stopped'>('yettostart');
    const [matrix, setMatrix] = useState(TEST_MATRIX_STATE);
    const [letterQueue, setLetterQueue] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    const [mode, setMode] = useState<'SetGame' | 'DeathGame'>('SetGame');
    const [difficulty, setDifficulty] = useState<'Easy' | 'Hard'>('Easy');

    //Decide on initial matrix based on mode
    useEffect(()=>{
        if(gamestate === 'running') {
            if(mode === 'SetGame') {
                console.info('Starting Set mode - generating one time random matrix');
                if(difficulty === 'Easy') {
                    setMatrix(fillMatrixWithVowelWeightedLetters(ALLOWED_ROWS, ALLOWED_COLS));
                }
                else {
                    setMatrix(fillMatrixWithRandomLetters(ALLOWED_ROWS, ALLOWED_COLS));
                }
            }
            else {
                console.info('Starting Death mode');
                setMatrix(INITIAL_MATRIX_STATE);
                
            }
        }
        
    }, [gamestate, mode, difficulty])

    // Timer effect - runs when game is in 'running' state
    useEffect(() => {
        let timerInterval: number | undefined;
        
        if (gamestate === 'running') {
        // Start the timer, incrementing every second
        timerInterval = window.setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);
        }
        
        // Cleanup function to clear interval when component unmounts or gamestate changes
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [gamestate]); // Only re-run effect when gamestate changes
  


    function startGame() {
        setGameState('running');
    }
    function endGame() {
        setGameState('stopped');
        setElapsedTime(0); 
        setMatrix(INITIAL_MATRIX_STATE);
        setFoundWords([]);
        setScore(0);
        clearLetterQueue();
    }
    function clearLetterQueue() {
        setLetterQueue([]);
    }

    function submitWord() {
        if(letterQueue.length < 1) return;

        const WORD = letterQueue
                    .map(rowcell => {
                        const [row, col] = rowcell.split('-').map(Number);
                        return matrix[row][col];
                    })
                    .join('');
        const FLAG = isValidEnglishWord(WORD);
        console.log(FLAG);

        if(FLAG) {
            const NEW_MATRIX = structuredClone(matrix);
            letterQueue.forEach((rowcell)=>{
                const [row, col] = rowcell.split('-').map(Number);
                NEW_MATRIX[row][col] = null;
            })

            setFoundWords([...foundWords, WORD]);
            setScore((prev)=>prev + (WORD.length * MULTIPLIER));
            setMatrix(NEW_MATRIX);
            clearLetterQueue();
        }
        else {
            console.log('Not a word dumbass, try harder');
        }
    }
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

    //utils
    function isValidEnglishWord(word: string): boolean {
        return WORD_SET.has(word.toLowerCase());
    }
     return(
        <div className='wf-app__main'>
            <div className="wf-app__timer">Time: {formatTime(elapsedTime)}</div>
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
                <button type='button' className='wf-app__clear' aria-label='clear selection' disabled={letterQueue.length === 0} onClick={clearLetterQueue}>Clear Queue</button>
                <button type='button' className='wf-app__submit' aria-label='submit word' disabled={letterQueue.length === 0} onClick={submitWord}>Submit word</button>
            </div>
            <div className='wf-app__controlgroup'>
                <button type='button' className='wf-app__start' aria-label='start' disabled={gamestate === 'running'} onClick={startGame}>Start Game</button>
                <button type='button' className='wf-app__end' aria-label='end' disabled={gamestate !== 'running'} onClick={endGame}>End Game</button>
            </div>
            <p className='wf-app__foundwords'>
                {foundWords.map((item,ind)=>{
                    return <Fragment key={ind}>{item}, </Fragment>
                })}
            </p>
            <p className='wf-app__score'>SCORE - {score}</p>
        </div>
    )
}