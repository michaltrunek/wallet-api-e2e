const { assert } = require("../config");
const { sendPostRequest } = require("./requestLibrary");
const { testData } = require("./bootstrap");

async function getSession(wallet, password) {
    const apiKey = testData.apiKey;
    const url = '/auth';
    const header = {'treetracker-api-key': apiKey};

    const body = {
        wallet: wallet,
        password: password
    };
    const response = await sendPostRequest(url, header, body);
    assert.equals(response.status, 200, 'Response status code is not 200 (OK)!');
    return response.body;
}

module.exports = {
    getSession
};
