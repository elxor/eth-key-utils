import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Home.module.scss';

const Home = () => {
    return (
        <div className={classes.content}>
            <h1 className={classes.title}>Ethereum Key Utils</h1>
            <div className={classes.noticeWrapper}>
                <p className={classes.notice}>
                    For security, use these utilities only offline.
                </p>
                <p className={classes.notice}>
                    You can download this app to your computer and run it without the Internet.
                </p>
                <a href="https://github.com/elxor/eth-key-utils#readme"
                className={classes.outlink}
                target="_blank"
                rel="noopener noreferrer">
                    Download from GitHub
                </a>
            </div>
            

            <div className={classes.item}>
                <Link
                    className={classes.link}
                    to="/extract-private-key"
                >Extract Private Key From Keystore File
                </Link>
                <p className={classes.description}>
                    This tool allows to you extract private key from standard ethereum keystore file with password. You can copy your private key or save it as unencrypted txt file.
                </p>
            </div>

            <div className={classes.item}>
                <Link
                    className={classes.link}
                    to="/change-keystore-pass"
                >Change Keystore File Password
                </Link>
                <p className={classes.description}>
                    Change the password of your keystore file. You will get the same keystore with new password.
                </p>
            </div>

            <div className={classes.item}>
                <Link
                    className={classes.link}
                    to="/keystore-from-private"
                >Generate Keystore File From Private Key
                </Link>
                <p className={classes.description}>
                    Encrypt your private key with password and get standard ethereum keystore file which fully compatible with other wallets such as MEW.
                </p>
            </div>

            <div className={classes.item}>
                <Link
                    className={classes.link}
                    to="/accounts-from-mnemonic"
                >Get Accounts From Mnemonic Phrase
                </Link>
                <p className={classes.description}>
                    This tool allows to you get accounts from your mnemonic phrase (seed). You can copy accounts private keys and addresses or save it as unencrypted txt files.
                </p>
            </div>

            <div className={classes.item}>
                <Link
                    className={classes.link}
                    to="/change-iteration-count"
                >Change Iteration Count of Key Derivation Function (KDF)
                </Link>
                <p className={classes.description}>
                    Password-based key derivation function such as scrypt used to encrypt the ethereum keystore file use a high iteration count to reduce vulnerabilities of brute-force attacks. With this tool you can change iteration count of key derivation function for keystore file. Make your keystore more resilient to brute-force attacks or reduce iteration count to other wallets do not freeze when you decrypting keystore file.
                </p>
            </div>
        </div>
        
    );
}

export default Home;
