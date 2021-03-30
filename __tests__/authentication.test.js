const { responseStatus: {OK}, assert } = require("../config");
const { sendPostRequest } = require("../helpers/requestLibrary");
const { testData } = require("./testData/bootstrap.js");
let currentResponse = null;
let testFailures = [];

const apiKey = testData.apiKey;
const url = '/auth';
const headers = {'treetracker-api-key': apiKey};
const user = {
    id: testData.wallet.id,
    wallet: testData.wallet.name,
    password: testData.wallet.password,
};

// end of debug lines

describe('Authentication', () => {
    it('[POST /auth] login with wallet name @auth @regression', async () => {
        const body = {
            wallet: user.wallet,
            password: user.password
        };

        currentResponse = await sendPostRequest(url, headers, body);

        assert.equals(currentResponse.status, OK, 'Response status code is not 200 (OK)!');
        assert.contains(currentResponse.header['content-type'], 'application\/json', 'Content type is not in a json format!');
    });

    it('[POST /auth] login with using wallet ID @auth @regression', async () => {
        const body = {
            wallet: user.id,
            password: user.password
        };

        currentResponse = await sendPostRequest(url, headers, body);

        assert.equals(currentResponse.status, OK, 'Response status code is not 200 (OK)!');
        assert.contains(currentResponse.header['content-type'], 'application\/json', 'Content type is not in a json format!');
    });

    afterEach(function() {
        const errorBody = currentResponse && currentResponse.body;

        if (this.currentTest.state === 'failed' && errorBody) {
            testFailures.push({
                test: this.currentTest.title,
                error: errorBody
            });
        }

        currentResponse = null;
    });

    after(() => {
        if (testFailures.length) {
            console.log('**************');
            console.log('Test failures:');
            console.log('**************');
            testFailures.forEach(testFailure => {
                console.log(testFailure.test);
                console.log(testFailure.error);
            })
        }
    });
});