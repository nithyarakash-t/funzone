import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './Wordflood.scss';
import { References } from '../../layout/references/References';
import { references } from './references';

export function Wordflood() {
    return (
        <section className='app-grid wf-app__wrap'>
            <h1 className='wf-app__title'>Contrast Checker</h1>
            <Routes>
                <Route path="/" element={
                    <>
                        <p>Main</p>
                        <div className='wf-app__refcont'>
                            <Link to={'./references'} aria-label="References for Css colors"
                               >References</Link>
                        </div>
                    </>
                }></Route>
                <Route path="/references" element={<References references={references} appname="Color Guesser" />}></Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </section>
    )
}