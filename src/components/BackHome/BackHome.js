import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './BackHome.module.scss';

const BackHome = () => {
    return (
        <Fragment>
            <Link exact="true" to="/" className={classes.backHome}>
                <i className={`fa fa-long-arrow-left ${classes.icon}`}></i>
                Back Home
            </Link>
            <div className={classes.line}></div>
        </Fragment>
    );
}

export default BackHome;
