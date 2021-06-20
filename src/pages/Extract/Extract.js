import React, { Fragment, useState } from 'react';
import web3Utils from 'web3-utils';
import classes from './Extract.module.scss';
import BackHome from '../../components/BackHome/BackHome';
import Wrapper from '../../components/Wrapper/Wrapper';
import InputFile from '../../components/InputFile/InputFile';
import InputPassword from '../../components/InputPassword/InputPassword';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard';
import Download from '../../components/Download/Download';
import { readFile } from '../../utils/readFile';
import { getAccoutFromFile } from '../../utils/getAccoutFromFile';

const Extract = () => {
    const [state, setState] = useState({
        fileName: 'no file selected',
        fileContent: '',
        password: '',
        valid: {file: false, pass: false},
        loading: false,
        error: ''
    });

    const [account, setAccount] = useState({
        address: '',
        privateKey: ''
    });

    const validation = value => {
        if (value && value !== '') {
            return true;
        } 
        return false;
    }

    const inputFileHandler = e => {
        const file = e.target.files[0];

        readFile(file).then(result => {
            const [name, content] = result;
            const isValid = validation(content);

            setState(state => ({
                ...state,
                fileName: name,
                fileContent: content,
                valid: {...state.valid, file: isValid}
            }));
        });
    }

    const inputPasswordHandler = e => {
        const isValid = validation(e.target.value);

        setState(state => ({
            ...state,
            password: e.target.value,
            valid: {...state.valid, pass: isValid}
        }));
    }

    const extractClickHandler = () => {
        setState(state => ({
            ...state,
            loading: true,
            error: ''
        }));

        getAccoutFromFile(state.fileContent, state.password).then(
            result => {
                setState(state => ({
                    ...state,
                    loading: false,
                    fileName: 'no file selected',
                    fileContent: '',
                    password: '',
                    valid: {file: false, pass: false},
                }));

                setAccount(account => ({
                    ...account,
                    address: web3Utils.toChecksumAddress(result[0]),
                    privateKey: result[1],
                }));
            },
            error => {
                setState(state => ({
                    ...state,
                    error: error.message,
                    loading: false
                }));
            }
        );
    }


    return (
        <Fragment>
            <BackHome />
            <h1 className={classes.title}>Extract Private Key From Keystore File</h1>
            <Wrapper>
                <div className={classes.content}>
                    <InputFile
                        onChange={inputFileHandler}
                        name={state.fileName}
                    />
                    <InputPassword
                        customClass={classes.inputPassword}
                        onChange={inputPasswordHandler}
                        value={state.password}
                        placeholder="Enter password"
                    />

                    {state.loading
                        ? <Loading />
                        : <Button
                            disabled={state.valid.file
                                && state.valid.pass
                                ? '' : 'disabled'}
                            onClick={extractClickHandler}
                        >Extract</Button>
                    }

                    {state.error !== '' &&
                        <div className={classes.error}>
                            Error: {state.error}!
                        </div>
                    }
                </div>
                {account.address !== '' &&
                    <div className={classes.account}>
                        <div>
                            <p className={classes.text}>Address</p>
                            <div className="wordwrap">
                                {account.address}
                                <CopyToClipboard
                                    textToCopy={account.address}
                                />
                            </div>
                        </div>
                        <div>
                            <p className={classes.text}>Private Key</p>
                            <div className="wordwrap">
                                {account.privateKey}
                                <CopyToClipboard
                                    textToCopy={account.privateKey}
                                />
                            </div>
                        </div>
                        <Download
                            account={account}
                        >Download
                        </Download>
                    </div>
                }
            </Wrapper>
        </Fragment>
    );
}

export default Extract;
