import React, { useState, useEffect } from 'react';
import classes from './Download.module.scss';

const Download = ({account, children}) => {

    const [state, setState] = useState({
        fileUrl: '',
        filename: ''
    });

    useEffect(() => {
        const name = `${account.address.slice(2)}.txt`;

        const content = JSON.stringify(account);
        const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
        const downloadUrl = URL.createObjectURL(blob);

        setState(state => ({
            ...state,
            fileUrl: downloadUrl,
            filename: name
        }));

        return () => {
            URL.revokeObjectURL(downloadUrl);
            setState(state => ({...state, fileUrl: ''}));
        }
    }, [account]);

    
    return (
        <a className={classes.downloadButton}
            download={state.filename}
            href={state.fileUrl}
            rel="noopener noreferrer"
        >{children}</a>
    )
}

export default Download;
