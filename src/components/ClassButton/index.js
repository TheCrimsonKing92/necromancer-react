import React from 'react';

import SelectableButton from '../SelectableButton';

const ClassButton = props => {
    const { theClass, setClass, ...remainder } = props;
    const { key, name } = theClass;

    const id = `${key}-class`;

    const onClick = () => setClass(theClass);

    return (
        <SelectableButton id={id} classes={'class-button'} onClick={onClick} {...remainder}>{name}</SelectableButton>
    );    
};

export default ClassButton;