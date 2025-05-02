import { Fragment, useEffect, useState } from 'react';
import wordList from 'an-array-of-english-words';
import './Main.scss';

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
const WORD_SET = new Set(wordList);
const MULTIPLIER = 10; //10 points per letter in word

export function Main() {
    const [matrix, setMatrix] = useState(TEST_MATRIX_STATE);
    const [queue, setQueue] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    useEffect(()=>{
        console.log(queue, 'queue update')
    }, [queue])


    function startGame() {

    }
    function resetGame() {
        setMatrix(INITIAL_MATRIX_STATE);
    }
    function clearQueue() {
        setQueue([]);
    }

    function submitWord() {
        if(queue.length < 1) return;

        const WORD = queue
                    .map(rowcell => {
                        const [row, col] = rowcell.split('-').map(Number);
                        return matrix[row][col];
                    })
                    .join('');
        const FLAG = isValidEnglishWord(WORD);
        console.log(FLAG);

        if(FLAG) {
            const NEW_MATRIX = structuredClone(matrix);
            queue.forEach((rowcell)=>{
                const [row, col] = rowcell.split('-').map(Number);
                NEW_MATRIX[row][col] = null;
            })

            setFoundWords([...foundWords, WORD]);
            setScore((prev)=>prev + (WORD.length * MULTIPLIER));
            setMatrix(NEW_MATRIX);
            clearQueue();
        }
        else {
            console.log('Not a word dumbass, try harder');
        }
    }
    function handleCellClick(input:(string)) {
        // const [ROW_INDEX, CELL_INDEX] = input.split('-');
        // console.log(ROW_INDEX, CELL_INDEX);
        let newQueue = structuredClone(queue);

        if(queue.indexOf(input) !== -1) {
            const index = queue.indexOf(input);
            newQueue = [...newQueue.slice(0, index), ...newQueue.slice(index + 1)];
        }
        else {
            newQueue.push(input);
        }

        setQueue(newQueue);
    }

    //utils
    function isValidEnglishWord(word: string): boolean {
        return WORD_SET.has(word.toLowerCase());
    }
     return(
        <div className='wf-app__main'>
            <div className='wf-grid__table'>
                <table >
                    <caption className='sr-only'>Word flood table</caption>
                    <tbody>
                        {matrix.map((row, rowIndex)=>{
                            return <tr key={rowIndex}>
                                {row.map((cellValue, cellIndex)=>{
                                    const ROW_CELL = `${rowIndex}-${cellIndex}`;
                                    return <td key={cellIndex}>
                                        <div className='wf-grid__table-cell'>
                                            <button type='button' className='wf-grid__table-button' aria-label='Select - lorem' disabled={cellValue === null ? true : undefined} aria-selected={queue.indexOf(ROW_CELL) !== -1} onClick={()=>handleCellClick(ROW_CELL)}>
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
                {queue.map((item, index)=>{
                    const [ROW_INDEX, CELL_INDEX] = item.split('-');
                    return <Fragment key={index}>{matrix[parseInt(ROW_INDEX)][parseInt(CELL_INDEX)]}</Fragment>
                })}
            </p>
            <div className='wf-app__controlgroup'>
                <button type='button' className='wf-app__clear' aria-label='clear selection' onClick={clearQueue}>Clear Queue</button>
                <button type='button' className='wf-app__submit' aria-label='submit word' onClick={submitWord}>Submit word</button>
            </div>
            <div className='wf-app__controlgroup'>
                <button type='button' className='wf-app__start' aria-label='start' onClick={startGame}>Start Game</button>
                <button type='button' className='wf-app__reset' aria-label='Reset' onClick={resetGame}>Restart Game</button>
            </div>
            <p className='wf-app__foundwords'>
                {foundWords.map((item,ind)=>{
                    return <Fragment key={ind}>{item}, </Fragment>
                })}
            </p>
            <p>{score}</p>
        </div>
    )
}