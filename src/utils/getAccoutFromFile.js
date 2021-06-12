import keythereum from 'keythereum';

export const getAccoutFromFile = async (json, password) => {

    const result = await new Promise((resolve, reject) => {
        const keyObject = JSON.parse(json);

        keythereum.recover(password, keyObject, result => {
            if (ArrayBuffer.isView(result)) {
                const address = keyObject.address;
                const privateKey = result.toString('hex');

                resolve([address, privateKey]);
            } else {
                reject(new Error('message authentication code mismatch'));
            }
        });
    });

    return result;
}