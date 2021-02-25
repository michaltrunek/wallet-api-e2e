const { request, expect, responseStatus, assert } = require("../config");

// debug lines below
const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYwODAxMDAwNCwiZXhwIjoxNjM5NTQ2MDA0LCJpc3MiOiJncmVlbnN0YW5kIn0.X4eT5qwbCu4sKQ1_02Mg8PeuTQdzSm_Cp8kcywbo3ZgB0vnukTWjATPY4sSDwxHAjMU1-zitj24Fep_EJdRsQd-j4DDe8IhJ50scBtCoOsBPj6Ib_YFwALc0A6UhsrvnGI-i7AH69IV0ogiuFWMw_EmfoGFQralqqVAvQflaYIPCWTnx4V7wDHNaqIAfn0becUsdIGnuuDHyIAFL95Irjo2ar9SF-rkrgyrBALh-G9ZO72L8AgxZXEHNN_zZf0q04tHGPhJri5LO17RrRCfInkOwrTxVtAd6vdNGP8CgiP7HjcB-dC8htmLCUIGG2GNJ81SZ83q5QN9rrVflhgxR6D6KK1R8kcsLSnpeqXXMbyeQ6xjS_qlHKNXMWV7umPzB3y3lXWrKOwpaJRL4nNUTBudg-NzSCsZnDmDPTOTzmPX4XHRFyo9nng6u4VVUF0bE6l747WZyikEH_bWxgeMEGQRy7UKVC4cHUOqIU56f11wtJsygwLOhpM07zXYogvztu46wAsXly1UMNZcPWQVkEQMyVG04x5G7WNhAOlq4bBPpEzb16Db0fS89fyIAE4uwzSlZVhK1yBYndX7Vc4A_BI97A3Lh2WrUB-EeLbwtb25nMP2jkb0v2D9ddTtwnJPKAxhhEdJIz9CyF_6C0IndOL7yLZGxKUcLnqBpLulN6lc';
const apiKey = 'pkCH3cP1VOlGsmG';
const tokenUid = '27955f6e-91e0-4bd2-b0c4-b4bbdaee885f';

const headers = {
    'TREETRACKER-API-KEY': apiKey,
    'Authorization': `Bearer ${bearerToken}`
};
// end of debug lines

describe("Tokens (Wallet API)", function () {
    it('Tokens - Verify all props received from details for one token', async () => {
        const response = await request
            .get(`/tokens/${tokenUid}`)
            .set('Authorization', `bearer ${bearerToken}`)
            .set('TREETRACKER-API-KEY', apiKey);

        console.log(response.text);
        assert.equals(response.status, responseStatus.OK, 'Response status does not equal!');

        //expect(response.status).to.eql(responseStatus.OK);
    });
});