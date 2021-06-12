import React, { Fragment, useState } from 'react';
import { isValidPrivate } from 'ethereumjs-util';
import web3Utils from 'web3-utils';
import classes from './KeystoreFromPrivate.module.scss';
import Wrapper from '../../components/Wrapper/Wrapper';
import BackHome from '../../components/BackHome/BackHome';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/InputPassword/InputPassword';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { generateKeystore } from '../../utils/generateKeystore';
import { downloadFile } from '../../utils/downloadFile';

const KeystoreFromPrivate = () => {
    const [state, setState] = useState({
        privateKey: '',
        password: '',
        loading: false,
        valid: {
            privKey: false,
            pass: false
        }
    });

    const validationPass = value => {
        if (value && value !== '') {
            return true;
        } 
        return false;
    }

    const validationPrivateKey = value => {
        const withoutPrefix = web3Utils.stripHexPrefix(value);
        const lengthValid = withoutPrefix.length === 64;

        if (web3Utils.isHex(value) && lengthValid) {
            const valid = isValidPrivate(Buffer.from(withoutPrefix, 'hex'));
            return valid;
        }
        return false;
    }

    const inputPrivateKeyHandler = e => {
        const isValid = validationPrivateKey(e.target.value);

        setState(state => ({
            ...state,
            privateKey: e.target.value,
            valid: {...state.valid, privKey: isValid}
        }));
    }

    const inputPasswordHandler = e => {
        const isValid = validationPass(e.target.value);

        setState(state => ({
            ...state,
            password: e.target.value,
            valid: {...state.valid, pass: isValid}
        }))
    }

    const generateClickHandler = () => {
        setState(state => ({
            ...state,
            loading: true
        }));

        generateKeystore(
            state.privateKey,
            state.password
        ).then(result => {

            const [name, content] = result;
            downloadFile(name, content);

            setState(state => ({
                ...state,
                loading: false,
                privateKey: '',
                password: '',
                valid: {
                    ...state.valid,
                    privKey: false,
                    pass: false
                }
            }));
        });
    }


    return (
        <Fragment>
            <BackHome />
            <h1 className={classes.title}>Generate Keystore File From Private Key</h1>
            <Wrapper>
                <div className={classes.content}>
                    <div className={classes.itemWrapper}>
                        <p className={classes.text}>
                            Please type in your private key
                        </p>
                        <Input
                            onChange={inputPrivateKeyHandler}
                            value={state.privateKey}
                            placeholder="Private key"
                        />
                    </div>
                    <div className={classes.itemWrapper}>
                        <p className={classes.text}>
                            Password
                        </p>
                        <InputPassword
                            onChange={inputPasswordHandler}
                            value={state.password}
                            placeholder="New password"
                        />
                    </div>
                    {state.loading
                        ? <Loading />
                        : <Button
                            disabled={state.valid.privKey
                                && state.valid.pass
                                ? '' : 'disabled'}
                            onClick={generateClickHandler}
                        >Generate Keystore
                        </Button>
                    }
                </div>
            </Wrapper>
        </Fragment>
    );
}

export default KeystoreFromPrivate;
