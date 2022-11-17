import React from 'react';

const Footer = ({ content }) => {
    return (
        <footer id="footer">
            <p style={{fontSize: "1.25em"}}>
                <strong>Info</strong>
            </p>
            {content}
        </footer>
    )
};

export default Footer;