Feature('Tokens (Wallet API)');

const { I } = inject();
const output = require('codeceptjs').output;
let baseUrl, bearerToken, apiKey, tokenUid;

BeforeSuite(( ) => {
    baseUrl = 'https://test-k8s.treetracker.org/wallet';
    bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYwODAxMDAwNCwiZXhwIjoxNjM5NTQ2MDA0LCJpc3MiOiJncmVlbnN0YW5kIn0.X4eT5qwbCu4sKQ1_02Mg8PeuTQdzSm_Cp8kcywbo3ZgB0vnukTWjATPY4sSDwxHAjMU1-zitj24Fep_EJdRsQd-j4DDe8IhJ50scBtCoOsBPj6Ib_YFwALc0A6UhsrvnGI-i7AH69IV0ogiuFWMw_EmfoGFQralqqVAvQflaYIPCWTnx4V7wDHNaqIAfn0becUsdIGnuuDHyIAFL95Irjo2ar9SF-rkrgyrBALh-G9ZO72L8AgxZXEHNN_zZf0q04tHGPhJri5LO17RrRCfInkOwrTxVtAd6vdNGP8CgiP7HjcB-dC8htmLCUIGG2GNJ81SZ83q5QN9rrVflhgxR6D6KK1R8kcsLSnpeqXXMbyeQ6xjS_qlHKNXMWV7umPzB3y3lXWrKOwpaJRL4nNUTBudg-NzSCsZnDmDPTOTzmPX4XHRFyo9nng6u4VVUF0bE6l747WZyikEH_bWxgeMEGQRy7UKVC4cHUOqIU56f11wtJsygwLOhpM07zXYogvztu46wAsXly1UMNZcPWQVkEQMyVG04x5G7WNhAOlq4bBPpEzb16Db0fS89fyIAE4uwzSlZVhK1yBYndX7Vc4A_BI97A3Lh2WrUB-EeLbwtb25nMP2jkb0v2D9ddTtwnJPKAxhhEdJIz9CyF_6C0IndOL7yLZGxKUcLnqBpLulN6lc';
    apiKey = 'pkCH3cP1VOlGsmG';
    tokenUid = '27955f6e-91e0-4bd2-b0c4-b4bbdaee885f';
});

Scenario('Tokens - Verify all props received from details for one token', {retries: 2}, async () => {
    const headers = {
        'TREETRACKER-API-KEY': apiKey,
        'Authorization': `Bearer ${bearerToken}`
    };

    const response = await I.sendGetRequest(`${baseUrl}/tokens/${tokenUid}`, headers);
    I.assertEquals(response.status, 200, 'Response status does not match!');

    response.data.hasOwnProperty('tree_id');
    response.data.hasOwnProperty('entity_id');
    response.data.hasOwnProperty('uuid');
    response.data.hasOwnProperty('transfer_pending');
    response.data.hasOwnProperty('transfer_pending_id');
    response.data.hasOwnProperty('created_at');
    response.data.hasOwnProperty('updated_at');
    response.data.hasOwnProperty('id');
    response.data.hasOwnProperty('links');

    // logging
    //output.print(response.data);
}).tag('wallet');

