import React, { Fragment, useState } from 'react';
import classes from './ChangePass.module.scss';
import BackHome from '../../components/BackHome/BackHome';
import Wrapper from '../../components/Wrapper/Wrapper';
import InputFile from '../../components/InputFile/InputFile';
import InputPassword from '../../components/InputPassword/InputPassword';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { getAccoutFromFile } from '../../utils/getAccoutFromFile';
import { generateKeystore } from '../../utils/generateKeystore';
import { downloadFile } from '../../utils/downloadFile';
import { readFile } from '../../utils/readFile';


const ChangePass = () => {
    const [state, setState] = useState({
        fileName: 'no file selected',
        fileContent: '',
        oldPass: '',
        newPass: '',
        loading: false,
        valid: {
            file: false,
            oldPass: false,
            newPass: false
        },
        message: '',
        error: ''
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


    const changePasswordClickHandler = () => {
        setState(state => ({
            ...state,
            loading: true,
            message: 'Start decrypting keystore file with password...',
            error: ''
        }));

        getAccoutFromFile(state.fileContent, state.oldPass).then(
            result => {
                setState(state => ({
                    ...state,
                    message: 'Creating keystore file with new password...'
                }));
                
                return generateKeystore(result[1], state.newPass)
            }
        ).then(
            result => {
                const [name, content] = result;
                downloadFile(name, content);

                setState(state => ({
                    ...state,
                    fileName: 'no file selected',
                    fileContent: '',
                    oldPass: '',
                    newPass: '',
                    loading: false,
                    message: 'Password changed successfully!',
                    valid: {
                        ...state.valid,
                        file: false,
                        oldPass: false,
                        newPass: false
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

    const oldPasswordInputHandler = e => {
        const isValid = validation(e.target.value);

        setState(state => ({
            ...state,
            oldPass: e.target.value,
            valid: {...state.valid, oldPass: isValid}
        }));
    }

    const newPasswordInputHandler = e => {
        const isValid = validation(e.target.value);

        setState(state => ({
            ...state,
            newPass: e.target.value,
            valid: {...state.valid, newPass: isValid}
        }));
    }


    return (
        <Fragment>
            <BackHome />
            <h1 className={classes.title}>Change Keystore File password</h1>
            <Wrapper>
                <div className={classes.content}>
                    <InputFile
                        onChange={inputFileHandler}
                        name={state.fileName}
                    />

                    <InputPassword
                        customClass={classes.inputPassword}
                        onChange={oldPasswordInputHandler}
                        value={state.oldPass}
                        placeholder="Enter password"
                    />
                
                    <InputPassword
                        customClass={classes.inputPassword}
                        onChange={newPasswordInputHandler}
                        value={state.newPass}
                        placeholder="Enter new password"
                    />

                    
                    {state.loading
                        ? <Loading />
                        : <Button
                            disabled={state.valid.file
                                && state.valid.oldPass
                                && state.valid.newPass
                                ? '' : 'disabled'}
                            onClick={changePasswordClickHandler}
                        >Change Password</Button>
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

export default ChangePass;
