import React, { useState } from 'react';
import Button from '../components/Button';
import GameFrame from './GameFrame';

const classDescriptions = {
    Medium: "A channeler of spirits, the medium uses ritualistic possession to achieve higher powers and reveal hidden information.",
    Summoner: "Summoners manifest spirits of the dead in the physical realm, raising unflinching soldiers.",
    Thaumaturgist: "Shrouded in secrecy, a thaumaturgist uses exotic, morbid ingredients to conjure magical items."
  };

const CharacterCreation = ({ onSubmit }) => {
    const [ name, setName ] = useState("");
    const [ characterClass, setCharacterClass ] = useState("");

    const toggleClass = (theClass) => {
        if (characterClass === theClass) {
            setCharacterClass("");
        } else {
            setCharacterClass(theClass);
        }
    };

    return (
        <GameFrame>
            <div>
                <h2>Character Creation</h2>
                <div>
                    <label>
                        Name:
                        <input style={{ marginLeft: '0.5rem' }} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <h3>Select Class</h3>
                    <div>
                        { Object.keys(classDescriptions).map((theClass) => (
                            <Button key={theClass} onClick={() => toggleClass(theClass)}>
                                {theClass}
                            </Button>
                        ))}
                    </div>
                    <div style={{ minHeight: "50px", marginTop: "1rem" }}>
                        <h4>{ characterClass ? characterClass : "No Class Selected" }</h4>
                        <p>{ characterClass ? classDescriptions[characterClass] : "Please select a class." }</p>
                    </div>
                </div>
                <Button onClick={() => onSubmit({ name, characterClass })} disabled={ !name || !characterClass }>Create Character</Button>
            </div>
        </GameFrame>
    );
};

export default CharacterCreation;