import React from 'react';

import SelectableButton from '../SelectableButton';

const ClassButton = props => {
    console.log('Got class props: ', props);
    let { theClass, setClass, ...remainder } = props;
    let { key, name } = theClass;

    const id = `${key}-class`;

    const onClick = () => setClass(theClass);

    return (
        <SelectableButton id={id} classes={'class-button'} onClick={onClick} {...remainder}>{name}</SelectableButton>
    );    
};

export default ClassButton;