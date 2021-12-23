import React from 'react';
import SkillDescription from '../SkillDescription';

const SkillButton = props => {
    const { setFooter, skill } = props;
    const { name } = skill;

    const bindSetFooter = skill => {
        return () => {
            setFooter(
                <SkillDescription skill={props.skill} />
            );
        };
    };

    const mySetFooter = bindSetFooter(skill);
    const resetFooter = () => setFooter(null);

    const getClasses = nameParts => {
        let classList = ['skill-button', 'hover-pointer'];
        
        if (nameParts.length === 1) {
            classList.push('skill-button-single-word');
        }
        
        return classList.join(' ');
    };

    const getContent = nameParts => {
        if (nameParts.length === 1) {
            return nameParts[0];
        }

        const copy = [];

        for (let i = 0; i < nameParts.length; i++) {
            const current = nameParts[i];
            copy.push(current);
            
            if (i < (nameParts.length - 1)) {
                copy.push(<br />);
            }
        }

        return copy;
    };

    const nameParts = name.split(' ');

    let styles = {};

    if (nameParts.length > 1) {
        styles.lineHeight = (50 / nameParts.length) + 'px';
    }

    const classes = getClasses(nameParts);
    const content = getContent(nameParts);

    return (
        <div className={classes} onClick={mySetFooter} onMouseOver={mySetFooter} onMouseOut={resetFooter} style={styles}>
            { content }
        </div>
    );
};

export default SkillButton;