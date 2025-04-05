import React from 'react';

const GameFrame = ({ character = null, children }) => (
    <div
        style={{
            margin: '0 auto',
            padding: '1rem',
            minWidth: '400px',
            maxWidth: '1000px',
            position: 'relative',
            border: '1px solid #444',
            borderRadius: '8px',
            backgroundColor: 'transparent'
        }}
    >
        { character && (
            <div
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem',
                    border: '1px solid #888',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer'
                }}
            >
                <h5 style={{ margin: '0 0 0.5rem 0' }}>{ character.name }</h5>
                <p style={{ margin: 0, fontSize: '0.75rem' }}>Level {character.level} { character.characterClass }</p>
            </div>
        )}
        <div style={ character ? { paddingTop: '4rem' } : {} }>{ children }</div>
    </div>
);

export default GameFrame;