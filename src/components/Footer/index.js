import React from 'react';
import Container from 'react-bootstrap/Container';

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
            <Container>
                <p style={infoStyles}>
                    <strong>Info</strong>
                </p>
                { hasContent && content}
            </Container>            
        </footer>
    )
};

export default Footer;