import React from 'react';
import Button from 'react-bootstrap/Button';

const SkillButton = props => {
    const { displaySkill, selectSkill, skill } = props;
    const { name } = skill;

    const onClick = () => selectSkill(skill);
    const resetContent = () => displaySkill(null);
    const setContent = () => displaySkill(skill);

    return (
        <Button variant="secondary" onClick={onClick} onMouseOver={setContent} onMouseOut={resetContent} style={{ minHeight: "62px" }}>{ name }</Button>
    );
};

export default SkillButton;