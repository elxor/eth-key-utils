import React, { Fragment, useState } from 'react';
import classes from './IterationCount.module.scss';
import BackHome from '../../components/BackHome/BackHome';
import Wrapper from '../../components/Wrapper/Wrapper';
import InputFile from '../../components/InputFile/InputFile';
import InputPassword from '../../components/InputPassword/InputPassword';
import KeystoreInfo from '../../components/KeystoreInfo/KeystoreInfo';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { readFile } from '../../utils/readFile';
import { getAccoutFromFile } from '../../utils/getAccoutFromFile';
import { generateKeystore } from '../../utils/generateKeystore';
import { downloadFile } from '../../utils/downloadFile';

const IterationCount = () => {
    const [state, setState] = useState({
        fileName: 'no file selected',
        fileContent: '',
        password: '',
        count: '',
        kdf: '...',
        loading: false,
        valid: {
            file: false,
            pass: false,
            countValid: true
        },
        message: '',
        error: ''
    });

    const validationPass = value => {
        if (value && value !== '') {
            return true;
        } 
        return false;
    }

    const inputFileHandler = e => {
        const file = e.target.files[0];

        readFile(file).then(result => {
            const [name, content] = result;
            const isValid = content !== '';

            const keyObject = JSON.parse(result[1]);

            const iterationCount = 
                keyObject.crypto.kdfparams.n ||
                keyObject.crypto.kdfparams.c;
            
            setState(state => ({
                ...state,
                fileName: name,
                fileContent: content,
                kdf: keyObject.crypto.kdf,
                count: iterationCount,
                valid: {...state.valid, file: isValid}
            }));
        }).catch(error => {
            setState(state => ({
                ...state,
                error: error.message
            }));
        });
    }

    const inputPasswordHandler = e => {
        const isValid = validationPass(e.target.value);

        setState(state => ({
            ...state,
            password: e.target.value,
            valid: {...state.valid, pass: isValid}
        }));
    }

    const validationCount = (num) => !(num & (num - 1)) && num !== 0;

    const inputIterationCountHandler = e => {
        const regex = /^\+?([1-9]\d*)+$|^$/;
        const valid = regex.test(e.target.value);

        let value = +e.target.value;

        const isCountValid = validationCount(value);

        if (valid) {
            setState(state => ({
                ...state,
                count: e.target.value,
                valid: {
                    ...state.valid,
                    countValid: isCountValid
                }
            }));
        }
    }

    const changeClickHandler = () => {
        setState(state => ({
            ...state,
            loading: true,
            message: 'Start decrypting keystore file with password...',
            error: ''
        }));

        getAccoutFromFile(state.fileContent, state.password).then(
            result => {
                setState(state => ({
                    ...state,
                    message: 'Creating keystore file with new iteration count...'
                }));

                return generateKeystore(result[1], state.password, state.count)
            }
        ).then(
            result => {
                const [name, content] = result;
                downloadFile(name, content);

                setState(state => ({
                    ...state,
                    fileName: 'no file selected',
                    fileContent: '',
                    password: '',
                    count: '',
                    kdf: '...',
                    loading: false,
                    message: 'Iteration count changed successfully!',
                    valid: {
                        ...state.valid,
                        file: false,
                        pass: false
                    }
                }));
            }
        ).catch(error => {
            setState(state => ({
                ...state,
                error: error.message,
                message: '',
                loading: false
            }));
        });
    }


    return (
        <Fragment>
            <BackHome /> 
            <h1 className={classes.title}>
                Change Iteration Count of Key Derivation Function (KDF)
            </h1>
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
                        placeholder='Enter password'
                    />

                    <KeystoreInfo
                        onChange={inputIterationCountHandler}
                        value={state.count}
                        kdfName={state.kdf}
                    />

                    {state.loading
                        ? <Loading />
                        : <Button 
                            onClick={changeClickHandler}
                            disabled={state.valid.file
                                && state.valid.pass
                                && state.valid.countValid
                                && state.count !== ''
                                ? '' : 'disabled'}
                        >Change</Button>
                    }

                    {state.message !== '' &&
                        <div className={classes.message}>
                            {state.message}
                        </div>
                    }

                    {state.error !== '' &&
                        <div className={classes.error}>
                            Error: {state.error}
                        </div>
                    }
                </div>
            </Wrapper>
        </Fragment>
    );
}

export default IterationCount;
