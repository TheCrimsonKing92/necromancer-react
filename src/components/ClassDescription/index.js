import React from 'react';

const ClassDescription = props => {
    const { name, description } = props.class;

    return (
        <>
            <p>
                <strong>
                    Class:
                </strong>
                {` ${name}`}
            </p>
            <p>
                <strong>
                    Description:
                </strong>
                {` ${description}`}
            </p>
        </>
    );
};

export default ClassDescription;