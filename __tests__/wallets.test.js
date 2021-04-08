const { responseStatus: {OK}, assert } = require("../config");
const { sendGetRequest } = require("../helpers/requestLibrary");
const { testData } = require("./testData/bootstrap.js");

// debug lines below
const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwYmUwMmJiLTllOWMtNGNjNC05M2VlLWVjYWFkYzUwNTRhZiIsImlhdCI6MTYxNDcwNTg3MiwiZXhwIjoxNjQ2MjQxODcyLCJpc3MiOiJncmVlbnN0YW5kIn0.oDaObEnDqbRIBsFE3a0v8kcGGjBps-_IN23iV_aFGxiWs4PiW8abI2Bmn9iSxVZ9Y6fr55E7e0LGtFf2IsKTlbZnlq_KxVRh2vMOU5-M40jGsQ275Oh5v0jKvRZT4NTJCXc9cGMAMEzO7FZ51Fy_5cx3Js0w0WCjFMxeYjVWizl4ZIr5RJZuBVKmptswG-IUhfBiHqgpHK3jtCwzy68TGEqi9DVAe_rVzj37Tp9YJV-PlJa1SbILN269ygz6XxqF7za-kdYfgiPq815x_mtuTLvzFBuV8_4E-5ZUa9HxW7RjxAg8aG6PEDrhkSfi4cCLe0Cj-NhUtC8uB6siHtUXGR9AmTdxkIXC-FXrQBjc6cgJUzmwnr2FyJnJMPlxFUIbbd7YEs-JreNCxS1bo6LtunQ69el9TRxxZ-jiOiZpDOGwehZXo2ZumjjG1oQhFLXJJNfPZh86_PeePRtzmZA0lNoEmBus4DEZW-xNnK4k1q7rfHZYYRAUKtW6wysEqTpHOANlE4vmKIrg9qGUoOCoy_1jlRWmns4YumiLEgY1fQJNI5p-CUN1KHRdq2nXTchIWN1lxZuW0UdcHEfzb0J4Wfp1x_Wq6R4IAPDWZsVwN6bVxb-4_3q4qNuShxZgYy_pRiyqRn0q1xjhq1sI0Rph51KH80gQVddHMS_qeZpygFc';
const apiKey = testData.apiKey;
const limit = 5;
const url = `/wallets/${limit}`;
const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'treetracker-api-key': apiKey
}

// end of debug lines

describe("Wallets (Wallet API)", function () {
    before(() => {
        console.log('Before all steps here:');
    });

    it('Wallets - Returns 200 response status @wallet @regression', async () => {
        const response = await sendGetRequest(url, headers);

        const {status} = response;
        assert.equals(status, OK, 'Response status does not equal!');
    });

    after(() => {
        console.log('After all steps here:');
    });
});