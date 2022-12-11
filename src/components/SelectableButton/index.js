import React from 'react';
import Button from 'react-bootstrap/Button';

const SelectableButton = props => {
    const { onClick, onMouseOver, onMouseOut, onSelected, selected } = props;
    let classes = "hover-pointer";

    if (props.classes !== null && props.classes !== "") {
        classes = `${classes} ${props.classes}`;
    }

    if (selected) {
        classes = `${classes} selected-box`;
    }

    const myClick = () => {
        if (onSelected) {
            onSelected();
        }

        onClick();
    };

    return (
        <Button id={props.id} variant={"dark"} onClick={myClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            { props.children }
        </Button>
    )
};

export default SelectableButton;