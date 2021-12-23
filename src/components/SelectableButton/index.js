import React from 'react';

const SelectableButton = props => {
    let classes = "hover-pointer";

    if (props.classes !== null && props.classes !== "") {
        classes = `${classes} ${props.classes}`;
    }

    if (props.selected) {
        classes = `${classes} selected-box`;
    }

    const myClick = () => {
        if (props.onSelected) {
            props.onSelected();
        }

        props.onClick();
    }

    return (
        <div id={props.id} className={classes} onClick={myClick}>
            { props.children }
        </div>
    )
};

export default SelectableButton;