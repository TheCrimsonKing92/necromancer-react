import React from 'react';

const SkillDescription = props => {
    const { name, description, tree, cost } = props.skill;

    return (
        <>
            <p>
                <strong>
                    Skill:
                </strong>
                {` ${name}`}
            </p>
            <p>
                <strong>
                    Description:
                </strong>
                {` ${description}`}
            </p>
            <p>
                <strong>
                    Tree:
                </strong>
                {` ${tree}`}
            </p>
            <p>
                <strong>
                    Cost:
                </strong>
                {` ${cost}`}
            </p>
        </>
    );
};

export default SkillDescription;