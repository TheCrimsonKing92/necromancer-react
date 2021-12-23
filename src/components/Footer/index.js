import React from 'react';

const Footer = props => {
    const { content } = props;

    if (!content) {
        return null;
    }

    return (
        <footer id="footer">
            {content}
        </footer>
    )
};

export default Footer;