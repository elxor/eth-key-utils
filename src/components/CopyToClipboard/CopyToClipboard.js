import React, { useState } from 'react';
import classes from './CopyToClipboard.module.scss';

const CopyToClipboard = ({textToCopy}) => {

    const [state, setState] = useState({
        hoverText: 'Copy to clipboard',
        check: false
    });

    const clickHandler = () => {
        navigator.clipboard.writeText(textToCopy);

        setState(state => ({
            ...state,
            check: true
        }));

        setTimeout(() => {
            setState(state => ({
                ...state,
                check: false
            }));
        }, 1500);
    }

    return (
        <div
            onClick={clickHandler}
            className={classes.copy}
        >
            <i className={`
                ${state.check ? 'fa fa-check': 'fa fa-copy'}
                ${classes.iconClass}`}
            ></i>
        </div>
    );
}

export default CopyToClipboard;
