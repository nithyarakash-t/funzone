import { Fragment, useEffect, useState } from 'react';
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

export function Main() {
    const [matrix, setMatrix] = useState(TEST_MATRIX_STATE)
    const [queue, setQueue] = useState<string[]>([]);

    useEffect(()=>{
        console.log(queue, 'queue update')
    }, [queue])


    function resetGame() {
        setMatrix(INITIAL_MATRIX_STATE);
    }
    function clearQueue() {
        setQueue([]);
    }
    function submitWord() {

    }
    function startGame() {

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
     return(
        <div className='wf-app__main'>
            <div className='wf-grid__table'>
                <table >
                    <caption className='sr-only'>Word flood table</caption>
                    <tbody>
                        {matrix.map((row, rowIndex)=>{
                            return <tr key={rowIndex}>
                                {row.map((cell, cellIndex)=>{
                                    const ROW_CELL = `${rowIndex}-${cellIndex}`;
                                    return <td key={cellIndex}>
                                        <div className='wf-grid__table-cell'>
                                            <button type='button' className='wf-grid__table-button' aria-label='Select - lorem' aria-selected={queue.indexOf(ROW_CELL) !== -1} onClick={()=>handleCellClick(ROW_CELL)}>
                                                {cell}
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
        </div>
    )
}