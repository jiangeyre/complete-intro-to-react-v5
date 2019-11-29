import React, {useState} from 'react';
import { Link } from '@reach/router';
import { css, keyframes } from '@emotion/core';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const NavBar = () => {
    const [padding, setPadding] = useState(15);

    const color = "pink";

    return(
    <header
        css={css`
            background-color: ${color};
            padding: ${padding}px;
        `}
    >
        <Link to="/">Adopt Me!</Link>
        <span
            css={css`
                font-size: 60px;

                display: inline-block;
                animation: 1s ${spin} linear infinite reverse;

                &:hover {
                    text-decoration: underline;
                }
            `} 
            role="img" aria-label="logo">🐱</span>
    </header>
    );
};

export default NavBar;

// vscode-styled-components