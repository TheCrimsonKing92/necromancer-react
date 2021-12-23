import { useNavigate } from 'react-router-dom';

import NavButton from "../NavButton";

const GuardedNav = props => {
    const navigate = useNavigate();
    const attemptNav = () => {
        if (props.guardCondition) {
            if (window.confirm(props.guardMessage)) {
                doNav();
            }
        } else {
            doNav();
        }
    };

    const doNav = () => {
        navigate(props.target);
    };

    return (
        <NavButton onClick={attemptNav} target={props.target}>
            {props.children}
        </NavButton>
    ) 

    
};

export default GuardedNav;