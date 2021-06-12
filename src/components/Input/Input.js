import React from 'react'
import classes from './Input.module.scss';

const Input = (props) => {
    return (
        <input
            className={classes.input}
            onChange={props.onChange}
            type="text"
            placeholder={props.placeholder}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            value={props.value}
        />
    );
}

export default Input;
