import React from 'react';
import Col from 'react-bootstrap/Col';
import ClassButton from "../ClassButton";

const getMapClass = (displayClass, onClick) => {
    return (theClass, i) => {
        return <>
                <Col xxl={2}>
                    <ClassButton key={i} childKey={i} displayClass={displayClass} theClass={theClass} setClass={onClick} />
                </Col>
               </>
    };
};

const ClassButtons = ({ classes, displayClass, onClick }) => {
    if (!classes || classes.length === 0) {
        return null;
    }

    const mapClass = getMapClass(displayClass, onClick);

    return classes.map(mapClass);
};

export default ClassButtons;