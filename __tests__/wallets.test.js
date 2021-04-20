const { responseStatus: {OK}, assert } = require("../config");
const { sendGetRequest } = require("../helpers/requestLibrary");
const { getSession } = require("../helpers/sessionLibrary");
const { testData } = require("../helpers/bootstrap.js");

let bearer = null;
const apiKey = testData.apiKey;
const wallet = testData.wallet.name;
const password = testData.wallet.password;
const limit = 5;
const url = `/wallets/${limit}`;

describe("Wallets (Wallet API)", function () {
    before(async () => {
        bearer = await getSession(wallet, password);
    });
    it('Wallets - Returns 200 response status @wallet @regression', async () => {
        const { token } = bearer;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'treetracker-api-key': apiKey
        };
        const response = await sendGetRequest(url, headers);

        const { status } = response;
        assert.equals(status, OK, 'Response status does not equal!');
    });
});