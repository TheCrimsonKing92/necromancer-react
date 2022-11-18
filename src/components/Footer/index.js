import React from 'react';

const Footer = ({ content }) => {
    const hasContent = content !== null;

    let infoStyles = {
        fontSize: "1.25em"
    };

    if (!hasContent) {
        infoStyles = {
            ...infoStyles,
            visibility: "hidden"
        };
    };

    return (
        <footer id="footer">
            <p style={infoStyles}>
                <strong>Info</strong>
            </p>
            { hasContent && content}
        </footer>
    )
};

export default Footer;