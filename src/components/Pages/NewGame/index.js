import React, { useState } from 'react';
import ClassButtons from '../../ClassButtons';
import SelectionGroup from '../../SelectionGroup';

const NewGame = props => {
    let [chosenClass, setChosenClass] = useState(null);
    
    const confirmClass = () => {
        if (chosenClass === null) {
            return;
        }

        props.confirmClass(chosenClass);
    };

    return (        
        <>
            <h3 style={{marginTop: '0.5em', marginBottom: '0.5em'}}>Choose a class below.</h3>
            <SelectionGroup>
                <ClassButtons classes={props.classes} setChosenClass={setChosenClass} />
            </SelectionGroup>
            <div id="chosen-class-info">
                <p>
                    You have chosen: <strong>{ !chosenClass ? 'None' : chosenClass.name }</strong>
                </p>
                <button type="button" id="confirm-class-button" className="hover-pointer standard-button" onClick={confirmClass}>Confirm</button>
            </div>
        </>
    )
};

export default NewGame;