import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import SkillButton from '../../../SkillButton';

import { ADD_SKILL, DISPLAY_SKILL } from '../../../../constants/Actions';

const banish = {
    name: 'Banish',
    description: 'Banishes lesser undead from this plane. Has no effect on the living, constructs, or greater undead.',
    tree: 'Necromancer Combat Skills',
    cost: '1 skill point'
};

const boneShield = {
    name: 'Bone Shield',
    description: 'Provides a shield with limited health, effective against physical damage.',
    tree: 'Necromancer Combat Skills',
    cost: '1 skill point'
};

const SkillSelection = props => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const { className, dispatch, firstTimeSkills = false } = props;

    const addSkill = skill => {
        dispatch({ type: ADD_SKILL, payload: skill });
    };

    const displaySkill = skill => {
        dispatch({ type: DISPLAY_SKILL, payload: skill });
    };

    return (
        <>
            <h2>Skills</h2>
            {
                firstTimeSkills &&
                <>
                    <Row>                        
                        <p>You have picked <strong>{className}</strong> as your class! Let's get started by choosing your first skill.</p>
                    </Row>
                    <Row style={{marginBottom: "16px"}}>
                        <Col style={{marginBottom: "2px"}} xxxl={1} xxl={1} xl={2} lg={3} med={4} sm={6}>
                            <SkillButton displaySkill={displaySkill} selectSkill={setSelectedSkill} skill={banish} />
                        </Col>
                        <Col xxxl={1} xxl={1} xl={2} lg={3} med={4} sm={6}>
                            <SkillButton displaySkill={displaySkill} selectSkill={setSelectedSkill} skill={boneShield} />
                        </Col>
                    </Row>
                </>
            }
            {
                selectedSkill !== null &&
                <>
                    <Row>
                        <p>You have chosen { selectedSkill.name }. This <strong>{ selectedSkill.tree }</strong> member will cost { selectedSkill.cost }.</p>
                        <p>You may confirm your skill choice or choose another skill.</p>
                    </Row>                
                    <Row>
                        <Col xxl={2}>
                            <Button variant={"dark"} onClick={() => addSkill(selectedSkill)}>Confirm Skill</Button>
                        </Col>
                    </Row>
                </>
            }
            {
                !firstTimeSkills &&
                <Row>
                    <p>Picking a new skill - you shouldn't be here yet!</p>
                </Row>
            }
        </>
    );
};

export default SkillSelection;