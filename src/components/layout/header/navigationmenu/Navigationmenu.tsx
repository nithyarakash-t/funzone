import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigationmenu.scss';

const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Tictactoe', path: '/tictactoe' },
];

export function NavigationMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState(() => {
        const currentPath = location.pathname;
        const currentItem = menuItems.find(item => item.path === currentPath);
        return currentItem?.label || 'Home';
    });
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const optionRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        // Reset focus when menu closes
        if (!isOpen) {
            setFocusedIndex(-1);
            return; // Early return if menu is closed
        }

        // Handle clicks outside when menu is open
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                const button = document.querySelector('.app-nxvmenu__control');
                if (button && !button.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
            optionRefs.current[focusedIndex]?.focus();
        }
    }, [focusedIndex]);

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                setIsOpen(false);
                setFocusedIndex(-1);
                break;
            case 'Enter':
            case ' ':
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(getSelectedIndex());
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(getSelectedIndex());
                } else {
                    setFocusedIndex(prev =>
                        prev < menuItems.length - 1 ? prev + 1 : 0
                    );
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(getSelectedIndex());
                } else {
                    setFocusedIndex(prev =>
                        prev > 0 ? prev - 1 : menuItems.length - 1
                    );
                }
                break;
        }
    };

    const handleOptionKeyDown = (e: KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const selectedItem = menuItems[index];
            setSelected(selectedItem.label);
            setIsOpen(false);
            navigate(selectedItem.path);
        }
    };

    /** Utils - START */
    const getSelectedIndex = () => {
        return menuItems.findIndex(item => item.label === selected);
    };
    /** Utils - END */
    return (
        <div className='app-nxvmenu__wrap' role="navigation" aria-label="Primary navigation" onKeyDown={handleKeyDown} >
            <button className='app-nxvmenu__control' role="combobox" aria-expanded={isOpen} aria-controls="app-nav-menu" 
                aria-label='Current page' aria-autocomplete="none" onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selected}</span>
            </button>

            <div id="app-nav-menu" ref={menuRef} className={`app-nxvmenu__dropdown ${isOpen ? '-open' : ''}`} 
                role="listbox" 
            >
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        ref={el => optionRefs.current[index] = el}
                        to={item.path}
                        className="app-nxvmenu__item"
                        role="option"
                        aria-selected={selected === item.label}
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => {
                            setSelected(item.label);
                            setIsOpen(false);
                        }}
                        onKeyDown={(e) => handleOptionKeyDown(e, index)}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}