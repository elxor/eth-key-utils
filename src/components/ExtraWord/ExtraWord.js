import React, { useState } from 'react';
import classes from './ExtraWord.module.scss';
import InputPassword from '../InputPassword/InputPassword';
import Switch from '../Switch/Switch';

const ExtraWord = (props) => {
    const [state, setState] = useState({
        checked: false
    });

    const checkboxHandler = () => {
        setState(state => ({
            ...state,
            checked: !state.checked
        }));
        props.clearValue && props.clearValue();
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.visiblePart}>
                <div className={classes.title}>
                    <span className={classes.span}>
                        Do you have an Extra Word?
                    </span>
                </div>
                <div className={classes.switcherWrapper}>
                    { state.checked ? <span>Yes</span> : <span>No</span>}
                    <Switch
                        onChange={checkboxHandler}
                        checked={state.checked}
                    />
                </div>
            </div>
            {state.checked &&
                <div className={classes.hiddenPart}>
                    <InputPassword
                        onChange={props.onChange}
                        value={props.value}
                        placeholder="Enter extra word"
                    />
                </div>
            }
        </div>
    );
}

export default ExtraWord;
