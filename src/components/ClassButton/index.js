import React from 'react';

import SelectableButton from '../SelectableButton';

const ClassButton = props => {
    const { displayClass, theClass, setClass, ...remainder } = props;
    const { key, name } = theClass;

    const id = `${key}-class`;

    const setContent = () => displayClass(theClass);
    const resetContent = () => displayClass(null);

    const onClick = () => setClass(theClass);

    return (
        <SelectableButton
            key={props.childKey}
            id={id}
            classes={'class-button'}
            onClick={onClick}
            onMouseOver={setContent}
            onMouseOut={resetContent}
             {...remainder}>
                 {name}
        </SelectableButton>
    );    
};

export default ClassButton;