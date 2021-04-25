const {expect, responseStatus: {OK, ACCEPTED}, assert} = require("../config");
const {sendGetRequest, sendPostRequest} = require("../helpers/requestLibrary");
const {getSession} = require("../helpers/sessionLibrary");
const {testData} = require("../helpers/bootstrap.js");

let bearer = null;
const apiKey = testData.apiKey;
const tokenUid = testData.token.id;
const getTokenInfoUri = `/tokens/${tokenUid}`;
const sendTokensUri = '/transfers';
const acceptTokenTransferUri = (id) => `/transfers/${id}/accept`;
const getWalletInfoUri = (limit) => `/wallets?limit=${limit}`;
const receiverWallet = testData.walletB.name;
const wallet = testData.wallet.name;
const password = testData.wallet.password;

const headers = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'treetracker-api-key': apiKey
    }
};

describe("Tokens (Wallet API)", function () {
    before(async () => {
        bearer = await getSession(wallet, password);
    });

    it('Tokens - Verify all props received from details for one token @token @regression', async () => {
        const response = await sendGetRequest(getTokenInfoUri, headers(bearer.token));

        const {body, status} = response;
        assert.equals(status, OK, 'Response status does not equal!', body);
        expect(body).to.have.property("id").eq(tokenUid);
        expect(body).to.have.property("capture_id");
        expect(body).to.have.property("wallet_id");
        expect(body).to.have.property("transfer_pending");
        expect(body).to.have.property("transfer_pending_id");
        expect(body).to.have.property("created_at");
        expect(body).to.have.property("updated_at");
        expect(body).to.have.property("links");
    });

    it('Tokens - Successful transfer of a token from A to B without trust relationship @token @regression', async () => {
        const senderPayload = {
            "bundle": {
                "bundle_size": 1
            },
            "sender_wallet": wallet,
            "receiver_wallet": receiverWallet
        };

        const response = await sendPostRequest(sendTokensUri, headers(bearer.token), senderPayload);
        const {body: senderBody, status: senderStatus} = response;

        assert.equals(senderStatus, ACCEPTED, 'Response status does not equal!', senderBody);
        expect(senderBody).to.have.property("id");
        expect(senderBody).to.have.property("active").eq(true);
        expect(senderBody).to.have.property("originating_wallet").eq(wallet);
        expect(senderBody).to.have.property("destination_wallet").eq(receiverWallet);
        const {id} = senderBody;

        bearer = await getSession(receiverWallet, password);

        const acceptTransferResponse = await sendPostRequest(acceptTokenTransferUri(id), headers(bearer.token), {});
        const {body: receiverBody, status: receiverStatus} = acceptTransferResponse;

        assert.equals(receiverStatus, OK, 'Response status does not equal!');
        expect(receiverBody).to.have.property("id");
        expect(receiverBody).to.have.property("type").eq("send");
        expect(receiverBody).to.have.property("state").eq("completed");
        expect(receiverBody).to.have.property("originating_wallet").eq(wallet);
        expect(receiverBody).to.have.property("destination_wallet").eq(receiverWallet);

        const limit = 50;
        const getWalletInfoResponse = await sendGetRequest(getWalletInfoUri(limit), headers(bearer.token));
        const {wallets} = getWalletInfoResponse.body;

        assert.equals(getWalletInfoResponse.status, OK, 'Response status does not match!');

        for (let wallet of wallets) {
            if (Object.values(wallet).includes(receiverWallet)) {
                assert.equals(wallet.tokens_in_wallet, 1, 'Number of expected tokens do not equal!');
                break;
            }
        }
    });
});