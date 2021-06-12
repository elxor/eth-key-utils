import React from 'react';
import classes from './Account.module.scss';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';
import Download from '../Download/Download';

const Account = ({accounts, index}) => {

    return (
        <div className={classes.account}>
            <div className={classes.numberAccount}>{index}</div>
            <div>
                <div className={`wordwrap ${classes.address}`}>
                    {accounts.address}
                    <CopyToClipboard
                        textToCopy={accounts.address}
                    />
                </div>
                <div className={`wordwrap ${classes.privateKey}`}>
                    {accounts.privateKey}
                    <CopyToClipboard
                        textToCopy={accounts.privateKey}
                    />
                </div>
            </div>
            <div className={classes.download}>
                <Download account={accounts}>
                    Download
                </Download>
            </div>
        </div>
    );
}

export default Account;
