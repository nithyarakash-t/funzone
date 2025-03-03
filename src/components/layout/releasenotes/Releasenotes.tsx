import { Link } from 'react-router-dom';
import { releaseNotes } from './release-notes';
import './Releasenotes.scss';

export function ReleaseNotes() {
    return (
        <section className="app-releasenotes__wrap" aria-labelledby="app_releasenotes_title">
            <div className="app-container">
                <div className='app-releasenotes__head'>
                    {/* Test autofocus - may not work */}
                    <Link autoFocus to={'/'} className='app-releasenotes__back' aria-label="Back to home">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
                    </Link>
                    <h2 className="app-releasenotes__title">Release Notes</h2>
                </div>
                <ol className="app-releasenotes__list">
                    {releaseNotes.map((item,index)=>{
                        return <li key={index}>
                            <div className="app-releasenotes__group" role="group" aria-labelledby={"releasenote_v_" + item.version}>
                                <h3 id={"releasenote_v_" + item.version}>Version {item.version} - {item.date}</h3>
                                <ul>
                                    {item.desc.map((cont, ind)=>{
                                        return <li key={ind}>{cont}</li>
                                    })}
                                </ul>
                            </div>
                        </li>
                    })}
                </ol>
            </div>
        </section>
    )
}