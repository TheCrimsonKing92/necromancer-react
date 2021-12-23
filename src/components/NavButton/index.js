import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavButton = props => {
    const navigate = useNavigate();

    const doNav = () => {
        navigate(props.target);
    };

    const onClick = props.onClick  ? props.onClick : doNav;

    return (
        <div className="hover-pointer menu-button" onClick={onClick}>
            {props.children}
        </div>
    ) 
};

export default NavButton;