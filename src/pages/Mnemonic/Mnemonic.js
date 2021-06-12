import React, { Fragment, useState, useEffect, useCallback } from 'react';
import * as bip39 from 'bip39';
import classes from './Mnemonic.module.scss';
import BackHome from '../../components/BackHome/BackHome';
import Wrapper from '../../components/Wrapper/Wrapper';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import ExtraWord from '../../components/ExtraWord/ExtraWord';
import Select from '../../components/Select/Select';
import CustomPath from '../../components/CustomPath/CustomPath';
import Account from '../../components/Account/Account';
import { getAccountsFromMnemonic } from '../../utils/getAccountsFromMnemonic';


const Mnemonic = () => {
    const [state, setState] = useState({
        textArea: '',
        mnemonic: '',
        accounts: '',
        isCustomPath: false,
        customPath: '',
        path: "m/44'/60'/0'/0",
        pathList: [
            "m/44'/60'/0'/0",
            "m/44'/61'/0'/0",
            "m/44'/60'/0'",
            "m/0'/0'/0'",
            "Custom Path"
        ],
        rangeAccounts: {start: 0, end: 5},
        inputExtraWord: '',
        extraWord: '',
        warning: false,
        errorText: '',
        notValidMnemonic: false,
        hiddenPart: false
    });

    const textAreaHandler = e => {
        setState(state => ({
            ...state,
            textArea: e.target.value
        }));
    }

    const extraWordHandler = e => {
        setState(state => ({
            ...state,
            inputExtraWord: e.target.value
        }));
    }

    const clearExtraWordInput = () => {
        setState(state => ({
            ...state,
            inputExtraWord: ''
        }));
    }

    const mGetAccountsFromMnemonic = useCallback(() => {
        return getAccountsFromMnemonic(
            state.mnemonic,
            state.path,
            state.rangeAccounts,
            state.extraWord
        );
    }, [state.mnemonic, state.extraWord, state.path, state.rangeAccounts]);

    useEffect(() => {
        if (state.mnemonic !== '') {
            const accounts = mGetAccountsFromMnemonic();

            setState(state => ({
                ...state,
                accounts: accounts,
                notValidMnemonic: false,
                hiddenPart: true
            }));
        }

    }, [mGetAccountsFromMnemonic, state.mnemonic]);

    const getAccountsHandler = () => {
        const mnemonicWords = state.textArea.trim();
        const valid = bip39.validateMnemonic(mnemonicWords);

        if (valid) {
            setState(state => ({
                ...state,
                mnemonic: state.textArea,
                extraWord: state.inputExtraWord,
                notValidMnemonic: false,
            }));

        } else {
            setState(state => ({
                ...state,
                notValidMnemonic: true
            }));
        }
    }

    const selectPathHandler = e => {
        if (e.target.value === 'Custom Path') {
            setState(state => ({
                ...state,
                isCustomPath: true
            }));
        } else {
            setState(state => ({
                ...state,
                isCustomPath: false,
                path: e.target.value
            }));
        }
    }

    const customPathHandler = e => {
        setState(state => ({
            ...state,
            customPath: e.target.value
        }));
    }

    const setCustomPath = () => {
        const regex = /^(m\/){1}(\d+'{1}\/)+(\d+'{1}\/)+\d+'?$/;
        const isValid = regex.test(state.customPath);

        if (isValid) {
            setState(state => ({
                ...state,
                pathList: [...state.pathList, state.customPath],
                isCustomPath: false,
                customPath: ''
            }));
        }
        else {
            setState(state => ({
                ...state,
                warning: true,
                errorText: 'Invalid Path'
            }));

            setTimeout(() => {
                setState(state => ({
                    ...state,
                    warning: false,
                    errorText: ''
                }));
            }, 3000);
        }
    }

    const prevBtnHandler = () => {
        const num = Number(Object.keys(state.accounts)[0]);

        if (num === 0) {
            return;

        } else {
            const num1 = num - 5;
            const num2 = num1 + 5;

            setState(state => ({
                ...state,
                rangeAccounts: {
                    ...state.rangeAccounts,
                    start: num1,
                    end: num2
                }
            }));
        }
    }

    const nextBtnHandler = () => {
        const num = Number(Object.keys(state.accounts)[0]);

        const num1 = num + 5;
        const num2 = num1 + 5;

        setState(state => ({
            ...state,
            rangeAccounts: {
                ...state.rangeAccounts,
                start: num1,
                end: num2
            }
        }));
    }


    return (
        <Fragment>
            <BackHome />
            <h1 className={classes.title}>Get Accounts From Mnemonic Phrase</h1>
            <Wrapper>
                <div className={classes.content}>
                    <TextArea
                        onChange={textAreaHandler}
                        value={state.textArea}
                    />
                    <ExtraWord
                        onChange={extraWordHandler}
                        value={state.inputExtraWord}
                        clearValue={clearExtraWordInput}
                    />
                    <Button onClick={getAccountsHandler}>
                        Get Accounts
                    </Button>

                    {state.notValidMnemonic && 
                        <p className={classes.notice}>
                            Error: Invalid Mnemonic Phrase!
                        </p>
                    }

                    {state.hiddenPart &&
                        <Fragment>
                            <div className={classes.path}>
                                <p>HD Derivation Path</p>
                                <Select
                                    options={state.pathList}
                                    onChange={selectPathHandler}
                                    value={state.path}
                                />
                            </div>
                            {state.isCustomPath &&
                                <CustomPath
                                    onChange={customPathHandler}
                                    addClickHandler={setCustomPath}
                                    value={state.customPath}
                                />
                            }
                            {state.warning && 
                                <p className={classes.notice}>
                                    Error: {state.errorText}!
                                </p>
                            }
                        </Fragment>
                    }   
                </div>

                {state.hiddenPart &&
                    <Fragment>
                        <div className={classes.accountsWrapper}>
                            {Object.entries(state.accounts).map((curr, i) => (
                                <Account key={i} accounts={curr[1]} index={+curr[0] + 1} />
                            ))}
                        </div>
                        <div className={classes.nav}>
                            <span
                                className={classes.navLeft}
                                onClick={prevBtnHandler}
                            >&#60; Prev</span>
				            <span
                                className={classes.navRight}
                                onClick={nextBtnHandler}
                            >Next &#62;</span>
                        </div>
                    </Fragment>
                }      
            </Wrapper>
        </Fragment>
    )
}

export default Mnemonic;
