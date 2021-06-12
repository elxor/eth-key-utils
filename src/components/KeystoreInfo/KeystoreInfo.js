import React from 'react';
import classes from './KeystoreInfo.module.scss';

const KeystoreInfo = (props) => {

    return (
        <div className={classes.infoWrapper}>
            <p className={classes.title}>Info about keystore file</p>
            <p>KDF: {props.kdfName}</p>
            <div>
                <div>
                    Iteration Count
                    <input
                        className={classes.inputCount}
                        type="text"
                        onChange={props.onChange}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value={props.value}
                    />
                </div>
            </div>
            <p className={classes.warning}>
                Iteration count value must be a power of 2
            </p>
        </div>
    );
}

export default KeystoreInfo;
