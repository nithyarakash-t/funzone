import { Themeswitch } from "../themeSwitch/Themeswitch";
import { Link } from "react-router-dom";
import './Header.scss';
import { NavigationMenu } from "./navigationmenu/Navigationmenu";

export function Header() {
    return (
        <header className="app-header__wrap app-grid">
            <div className="app-header__inner">
                <Link to={'/'} className='app-header__title' aria-label='Home - Nithya`s portfolio'>
                    FunZone
                </Link>
                <NavigationMenu/>
                <Themeswitch/>
            </div>
        </header>
    )
}