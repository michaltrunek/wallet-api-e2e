const { expect, responseStatus: {OK}, assert } = require("../config");
const { sendGetRequest, sendPostRequest } = require("../helpers/requestLibrary");
const { getSession } = require("../helpers/sessionLibrary");
const { testData } = require("../helpers/bootstrap.js");

let bearer = null;
const apiKey = testData.apiKey;
const tokenUid = testData.token.id;
const url = `/tokens/${tokenUid}`;
const wallet = testData.wallet.name;
const password = testData.wallet.password;

describe("Tokens (Wallet API)", function () {
    before(async () => {
        bearer = await getSession(wallet, password);
    });

    it('Tokens - Verify all props received from details for one token @token @regression', async () => {
        const { token } = bearer;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'treetracker-api-key': apiKey
        };
        const response = await sendGetRequest(url, headers);

        const {body, status} = response;
        assert.equals(status, OK, 'Response status does not equal!');
        expect(body).to.have.property("id").eq(tokenUid);
        expect(body).to.have.property("capture_id");
        expect(body).to.have.property("wallet_id");
        expect(body).to.have.property("transfer_pending");
        expect(body).to.have.property("transfer_pending_id");
        expect(body).to.have.property("created_at");
        expect(body).to.have.property("updated_at");
        expect(body).to.have.property("links");
    });
});