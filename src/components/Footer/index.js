import React from 'react';
import Container from 'react-bootstrap/Container';

const Footer = ({ content }) => {
    const hasContent = content !== null;

    let footerStyles = {};

    let infoStyles = {
        fontSize: "1.25em"
    };

    if (!hasContent) {
        footerStyles = {
            ...footerStyles,
            visibility: "hidden"
        };
    };

    return (
        <footer id="footer" style={footerStyles}>
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