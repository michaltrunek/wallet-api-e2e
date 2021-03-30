const { expect, responseStatus: {OK}, assert } = require("../config");
const { sendGetRequest, sendPostRequest } = require("../helpers/requestLibrary");
const { testData } = require("./testData/bootstrap.js");

// debug lines below
const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1MWI3Mzg5LTI4OTAtNDQ2ZC1hNjUzLWRhODIyMzFjYzRhYyIsImlhdCI6MTYxNzA4Njc0MiwiZXhwIjoxNjQ4NjIyNzQyLCJpc3MiOiJncmVlbnN0YW5kIn0.G7uK74OEvE8E_SfYVQ5xGAZ137iv0WjP4ecmalzUE6q1bmgAzTtIAiXlFBlm8FYblYia4a-SfE4D-rVT2sASclT13IK0jYcfrKFWQ4oJBEGb-8-ZKuWm6R0WGEP0KT-zCEXTL9nrArGre-uM4-Q10ItyX7FJpsbhRjN2-82txKW5goTRuuA8LaC2ifhgrpoWFH09u-cYzJkNAqKyrDTARUX92ym_oxNsAu_l-XuCdGCQkZ1ST7Uhzc2O8ZZwPPDBx_XChoMIXGN8SwrlRVETUxNhk3EBREyYXGsXVyl3klymJdZQHchHD05VzLeHLAzf00h8Umi7YIcIJmQrNEhA6BwodaHyJOJwXPF-pcao5ogmqgdPJb6MYtoLQtt35r-T1ob2yosddLxpaNEuWZ9rmK1wvlzzX_1yyZPhooEXjcTaWYcXVJPUd5QhdbD14fzLSKFDsbm2pj4PAY0vRnpX6dr8knmHqIrIyfrYtKlW_VJeQsfgLZLAQs7iBYHmO2tvrStgTSNXLQqDBejla3PX8XQHblr4w1S4f6hZFHVN3eCZGuK3YNuiZO2ephZa3zD0jy0EYm8LcMvCnhRTXGFjAlGy_unaszNpdcObDNg9tmqdfr36x9JYgBYENkAbLnBeAlX4MENv8M8tMeCAsKjeaEahkVu1V9Tu4oEGXMDVY4E';
let bearer = null;
const apiKey = testData.apiKey;
const tokenUid = testData.token.id;
const url = `/tokens/${tokenUid}`;

describe("Tokens (Wallet API)", function () {
    before(async () => {
        console.log('Getting bearer token...');
        const url = '/auth';
        const header = {'treetracker-api-key': apiKey};

        const body = {
            wallet: testData.wallet.name,
            password: testData.wallet.password
        };
        bearer = await sendPostRequest(url, header, body);
        assert.equals(bearer.status, OK, 'Response status code is not 200 (OK)!');
    });

    it('Tokens - Verify all props received from details for one token @token @regression', async () => {
        console.log(tokenUid);
        const { token } = bearer.body;
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