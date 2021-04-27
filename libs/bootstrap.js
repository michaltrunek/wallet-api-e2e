const data = require("../database/seed.js");

exports.mochaHooks = {
    beforeAll: async () => {
        console.log('Creating test data in DB...');
        await data.clear([data.wallet.id, data.walletB.id, data.walletC.id]);
        await data.seed();
    },
    afterAll: async () => {
        console.log('Clearing test data from DB!');
        await data.clear([data.wallet.id, data.walletB.id, data.walletC.id]);
    }
};

exports.testData = data;