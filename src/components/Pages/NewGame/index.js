import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ClassButtons from '../../ClassButtons';
import SelectionGroup from '../../SelectionGroup';

import { DISPLAY_CLASS, SET_CLASS } from '../../../constants/Actions';

const NewGame = ({ classes, dispatch }) => {
    let [chosenClass, setChosenClass] = useState(null);

    const displayClass = theClass => {
        if (chosenClass !== null) {
            return;
        }

        dispatch({
            type: DISPLAY_CLASS,
            payload: theClass
        });
    };
    
    const confirmClass = () => {
        if (chosenClass === null) {
            return;
        }

        dispatch({
            type: SET_CLASS,
            payload: chosenClass
        });
    };

    return (        
        <>
            <h2 style={{ marginBottom: "16px" }}>Choose a class.</h2>
            <Row style={{ marginBottom: "16px" }}>
                <SelectionGroup>
                    <ClassButtons classes={classes} displayClass={displayClass} onClick={setChosenClass} />
                </SelectionGroup>
            </Row>
            <Row>
                <p>
                    You have chosen: <strong>{ !chosenClass ? 'None' : chosenClass.name }</strong>
                </p>
            </Row>
            <Row>
                <Col xxl={2}>
                    <Button id="confirm-class-button" className="hover-pointer" variant={"dark"} onClick={confirmClass}>Confirm</Button>
                </Col>
            </Row>
        </>
    )
};

export default NewGame;