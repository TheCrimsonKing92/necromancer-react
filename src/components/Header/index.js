import React from 'react';

import GuardedNav from '../GuardedNav';
import NavButton from '../NavButton';
import logo from '../../logo.png';

const Header = props => {
    const redirectToRoot = () => {
        const protocol = window.location.protocol;
        const current = window.location.host;

        const concatenated = protocol + "//" + current;
        window.location.assign(concatenated);
    };

    return (
        <header id="header">
            <img src={logo} alt="Necromancer Logo" style={{marginTop: '5px', marginBottom: '5px'}} />
            <h1 id="game-title" className="hover-pointer" onClick={redirectToRoot} style={{marginTop: '0.3em'}}>
                Necromancer
            </h1>
            <GuardedNav guardCondition={props.gameStarted} guardMessage={'Starting a new game will erase your current save. Are you sure you want to continue?'} target={'/new'}>
                New Game
            </GuardedNav>
            <NavButton target={'/load'}>
                Load Game
            </NavButton>
            <NavButton target={'/help'}>
                Help
            </NavButton>
            <NavButton target={'/settings'}>
                Settings
            </NavButton>
        </header>
    )
};

export default Header;