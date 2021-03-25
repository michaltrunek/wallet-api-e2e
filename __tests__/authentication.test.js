const {responseStatus: {OK}, assert} = require("../config");
const { sendPostRequest } = require("../helpers/requestLibrary");

const apiKey = 'OriHFWVw3dz2fSC';
const url = '/auth';
const headers = {'treetracker-api-key': apiKey};
const user = {
    id: '40be02bb-9e9c-4cc4-93ee-ecaadc5054af',
    wallet: 'Isabelle_Bahringer73',
    password: 'pnlTaHL5n0cQfPG',
};

// end of debug lines

describe('Authentication', () => {
    it(`[POST /auth] login with wallet name: ${user.wallet}`, async () => {
        const body = {
            wallet: user.wallet,
            password: user.password
        };

        const response = await sendPostRequest(url, headers, body);

        assert.equals(response.status, OK, 'Response status code is not 200 (OK)!');
        assert.contains(response.header['content-type'], 'application\/json', 'Content type is not in a json format!');
    });

    it(`[POST /auth] login with using wallet id: ${user.id}`, async () => {
        const body = {
            wallet: user.id,
            password: user.password
        };

        const response = await sendPostRequest(url, headers, body);

        assert.equals(response.status, OK, 'Response status code is not 200 (OK)!');
        assert.contains(response.header['content-type'], 'application\/json', 'Content type is not in a json format!');
    });
});