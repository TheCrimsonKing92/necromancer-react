import React from 'react';
import ClassButton from "../ClassButton";

const ClassButtons = ({classes, setChosenClass}) => {
    if (!classes || classes.length === 0) {
        return null;
    }

    return classes.map(theClass => <ClassButton theClass={theClass} setClass={setChosenClass} />);
};

export default ClassButtons;