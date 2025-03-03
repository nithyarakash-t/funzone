import { Themeswitch } from "../themeSwitch/Themeswitch";
import { Link } from "react-router-dom";
import './Header.scss';

export function Header() {
    return (
        <header className="app-header__wrap app-grid">
            <div className="app-header__inner">
                <Link to={'/'} className='app-header__title' aria-label='Home - Nithya`s portfolio'>
                    App name.
                </Link>
                <Themeswitch/>
            </div>
        </header>
    )
}