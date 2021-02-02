Feature('Wallets (Wallet API)');

const { I } = inject();
const output = require('codeceptjs').output;
const faker = require('faker');
let baseUrl, bearerToken, apiKey;

BeforeSuite(( ) => {
    baseUrl = 'https://test-k8s.treetracker.org/wallet';
    bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYwODAxMDAwNCwiZXhwIjoxNjM5NTQ2MDA0LCJpc3MiOiJncmVlbnN0YW5kIn0.X4eT5qwbCu4sKQ1_02Mg8PeuTQdzSm_Cp8kcywbo3ZgB0vnukTWjATPY4sSDwxHAjMU1-zitj24Fep_EJdRsQd-j4DDe8IhJ50scBtCoOsBPj6Ib_YFwALc0A6UhsrvnGI-i7AH69IV0ogiuFWMw_EmfoGFQralqqVAvQflaYIPCWTnx4V7wDHNaqIAfn0becUsdIGnuuDHyIAFL95Irjo2ar9SF-rkrgyrBALh-G9ZO72L8AgxZXEHNN_zZf0q04tHGPhJri5LO17RrRCfInkOwrTxVtAd6vdNGP8CgiP7HjcB-dC8htmLCUIGG2GNJ81SZ83q5QN9rrVflhgxR6D6KK1R8kcsLSnpeqXXMbyeQ6xjS_qlHKNXMWV7umPzB3y3lXWrKOwpaJRL4nNUTBudg-NzSCsZnDmDPTOTzmPX4XHRFyo9nng6u4VVUF0bE6l747WZyikEH_bWxgeMEGQRy7UKVC4cHUOqIU56f11wtJsygwLOhpM07zXYogvztu46wAsXly1UMNZcPWQVkEQMyVG04x5G7WNhAOlq4bBPpEzb16Db0fS89fyIAE4uwzSlZVhK1yBYndX7Vc4A_BI97A3Lh2WrUB-EeLbwtb25nMP2jkb0v2D9ddTtwnJPKAxhhEdJIz9CyF_6C0IndOL7yLZGxKUcLnqBpLulN6lc';
    apiKey = 'pkCH3cP1VOlGsmG';
});

Scenario('Wallets - Verify all props received from all wallets managed by logged in account', {retries: 2}, async () => {
    const headers = {
        'TREETRACKER-API-KEY': apiKey,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
    };

    const response = await I.sendGetRequest(`${baseUrl}/wallets`, headers);
    const { wallets } = response.data;
    I.assertEquals(response.status, 200, 'Response status does not match!');

    wallets.forEach(function (wallet) {
        wallet.hasOwnProperty('id');
        wallet.hasOwnProperty('type');
        wallet.hasOwnProperty('uuid');
        wallet.hasOwnProperty('name');
        wallet.hasOwnProperty('email');
        wallet.hasOwnProperty('phone');
        wallet.hasOwnProperty('password');
        wallet.hasOwnProperty('salt');
        wallet.hasOwnProperty('logo_url');
        wallet.hasOwnProperty('tokens_in_wallet');
    });

    // logging
    //output.print(response.data);
}).tag('wallet');

Scenario('Wallets - Verify new managed wallet is created successfully', {retries: 2}, async () => {
    const expectedWallet = 'NewWalletByAutoTool_' + faker.random.number();
    let walletCreated = false;

    const body = {
        "wallet": expectedWallet
    };

    const headers = {
        'TREETRACKER-API-KEY': apiKey,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
    };

    const response = await I.sendPostRequest(`${baseUrl}/wallets `, body, headers);
    I.assertEquals(response.status, 200, 'Response status does not match!');

    response.data.wallet = expectedWallet;
    const getAllManagedWalletsResponse = await I.sendGetRequest(`${baseUrl}/wallets `, headers);
    const { wallets } = getAllManagedWalletsResponse.data;
    I.assertEquals(response.status, 200, 'Response status does not match!');

    for (let wallet of wallets) {
        if (Object.values(wallet).includes(expectedWallet)) {
            //output.print('Wallet has been created successfully');
            walletCreated = true;
            break;
        }
    }

    I.assertEquals(walletCreated, true, 'Wallet was not created!');

    // logging
    //output.print(wallets);
}).tag('wallet');

