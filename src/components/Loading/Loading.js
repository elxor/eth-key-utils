import React from 'react';
import classes from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={classes.loading}>
            <i className={`fa fa-spinner fa-spin ${classes.iconSpin}`}></i>
        </div>
    );
}

export default Loading;
