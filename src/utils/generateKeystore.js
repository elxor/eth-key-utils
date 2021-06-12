import keythereum from 'keythereum';
import web3Utils from 'web3-utils';

export const generateKeystore = async (privateKey, password, count = 131072) => {
    const modPrivateKey = web3Utils.stripHexPrefix(privateKey);

    const params = { keyBytes: 32, ivBytes: 16 };
    const dk = keythereum.create(params);

    const options = {
        kdf: "scrypt",
        cipher: "aes-128-ctr",
        kdfparams: {dklen: 32, n: +count, r:8, p:1}
    };

    const result = await new Promise(resolve => {
        keythereum.dump(password, modPrivateKey, dk.salt, dk.iv, options, keyObject => {

            const name = `UTC--${new Date()
                .toISOString().replace(/[:]/g, '-')}--${keyObject.address}`;
    
            const jsonContent = keythereum.exportToFile(keyObject);

            resolve([name, jsonContent]);
        });
    });

    return result;
}