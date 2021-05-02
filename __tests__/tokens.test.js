const {expect, sendGetRequest, sendPostRequest, responseStatus: {OK, ACCEPTED}, assert} = require("../config");
const {getSession} = require("../libs/sessionLibrary");
const {testData} = require("../libs/bootstrap.js");
const {assertSendTokensBody, assertTransferCompletedBody, assertTransferDeclinedBody} = require("../helpers/tokenActionsHelper.js");

let senderBearerToken, receiverBearerToken, receiverEmptyBearerToken = null;
const apiKey = testData.apiKey;
const tokenUid = testData.token.id;
const getTokenInfoUri = `/tokens/${tokenUid}`;
const sendTokensUri = '/transfers';
const acceptTokenTransferUri = (id) => `/transfers/${id}/accept`;
const declineTokenTransferUri = (id) => `/transfers/${id}/decline`;
const getWalletInfoUri = (limit) => `/wallets?limit=${limit}`;
const receiverWallet = testData.walletB.name;
const receiverEmptyWallet = testData.walletC.name;
const senderWallet = testData.wallet.name;
const password = testData.wallet.password;

const headers = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'treetracker-api-key': apiKey
    }
};

const payload = (walletA, walletB) => {
    return {
        "bundle": {
            "bundle_size": 1
        },
        "sender_wallet": walletA,
        "receiver_wallet": walletB
    }
};

describe("Tokens (Wallet API)", function () {
    before(async () => {
        senderBearerToken = await getSession(senderWallet, password);
        receiverBearerToken = await getSession(receiverWallet, password);
        receiverEmptyBearerToken = await getSession(receiverEmptyWallet, password);
    });

    it('Tokens - Verify all props received from details for one token @token @regression', async () => {
        const response = await sendGetRequest(getTokenInfoUri, headers(senderBearerToken.token));

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

    it('Tokens - Successful transfer of a token from A to B without trust relationship @token @regression @debug', async () => {
        const response = await sendPostRequest(sendTokensUri, headers(senderBearerToken.token), payload(senderWallet, receiverWallet));
        assertSendTokensBody(response, senderWallet, receiverWallet);
        const {id} = response.body;

        const acceptTransferResponse = await sendPostRequest(acceptTokenTransferUri(id), headers(receiverBearerToken.token), {});
        assertTransferCompletedBody(acceptTransferResponse, senderWallet, receiverWallet);

        const limit = 50;
        const getWalletInfoResponse = await sendGetRequest(getWalletInfoUri(limit), headers(receiverBearerToken.token));
        const {wallets} = getWalletInfoResponse.body;
        assert.equals(getWalletInfoResponse.status, OK, 'Response status does not match!');

        for (let wallet of wallets) {
            if (Object.values(wallet).includes(receiverWallet)) {
                assert.equals(wallet.tokens_in_wallet, 1, 'Number of expected tokens do not equal!');
                break;
            }
        }
    });

    it('Tokens - Declined transfer of a token from A to B without trust relationship @token @regression @debug', async () => {
        const response = await sendPostRequest(sendTokensUri, headers(senderBearerToken.token), payload(senderWallet, receiverEmptyWallet));
        assertSendTokensBody(response, senderWallet, receiverEmptyWallet);
        const {id} = response.body;

        const declineTransferResponse = await sendPostRequest(declineTokenTransferUri(id), headers(receiverEmptyBearerToken.token), {});
        assertTransferDeclinedBody(declineTransferResponse, senderWallet, receiverEmptyWallet);

        const limit = 50;
        const getWalletInfoResponse = await sendGetRequest(getWalletInfoUri(limit), headers(receiverEmptyBearerToken.token));
        const {wallets} = getWalletInfoResponse.body;

        assert.equals(getWalletInfoResponse.status, OK, 'Response status does not match!');

        for (let wallet of wallets) {
            if (Object.values(wallet).includes(receiverEmptyWallet)) {
                assert.equals(wallet.tokens_in_wallet, 0, 'Number of expected tokens do not equal!');
                break;
            }
        }
    });
});