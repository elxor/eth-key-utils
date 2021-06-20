import React, { useState, useRef, useEffect } from 'react';
import classes from './CopyToClipboard.module.scss';


const CopyToClipboard = ({textToCopy}) => {

    const [state, setState] = useState({
        check: false
    });

    const timeout = useRef(null);

    const clickHandler = () => {
        navigator.clipboard.writeText(textToCopy);

        setState(state => ({
            ...state,
            check: true
        }));

        timeout.current = setTimeout(() => {
            setState(state => ({
                ...state,
                check: false
            }));
        }, 1000);
    }

    useEffect(() => {
        return () => clearTimeout(timeout.current);
    }, []);

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
