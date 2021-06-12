import React from 'react';
import classes from './Switch.module.scss';

const SimpleSwitch = (props) => {
    return (
        <div className={classes.switcher}>
            <input type="checkbox"
                className={classes.checkbox}
                id="extraWordId"
                onChange={props.onChange}
                checked={props.checked ? 'checked' : ''}
            />
            <label className={classes.label} htmlFor="extraWordId" />
        </div>
    );
}

export default SimpleSwitch;
