import React from 'react';
import classes from './TextArea.module.scss';

const TextArea = (props) => {
    return (
        <textarea
            className={classes.textarea}
            onChange={props.onChange}
            value={props.value}
            placeholder="Enter mnemonic phrase here"
        />
    );
}

export default TextArea;
