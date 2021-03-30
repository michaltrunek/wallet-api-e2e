const data = require("../../database/seed.js");

exports.mochaHooks = {
    beforeAll: async () => {
        console.log('Creating test data in DB...');
        console.log('db user name is: ' + process.env.DBUSERNAME);
        await data.seed();
    },
    afterAll: async () => {
        console.log('Clearing test data from DB!');
        await data.clear(data.token.id);
    }
};

exports.testData = data;