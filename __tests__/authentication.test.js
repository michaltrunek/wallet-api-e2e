const { request, expect, responseStatus: {OK}, assert} = require("../config");

const apiKey = 'OriHFWVw3dz2fSC';
const user = {
    id: '40be02bb-9e9c-4cc4-93ee-ecaadc5054af',
    wallet: 'Isabelle_Bahringer73',
    password: 'pnlTaHL5n0cQfPG',
};

// end of debug lines

describe('Authentication', () => {
    it(`[POST /auth] login with wallet name: ${user.wallet}`, async () => {
        await request
            .post('/auth')
            .set('treetracker-api-key', apiKey)
            .send({
                wallet: user.wallet,
                password: user.password
            })
            .expect(OK)
            .expect('Content-Type', /application\/json/)
    });

    it(`[POST /auth] login with using wallet id: ${user.id}`, async () => {
        await request
            .post('/auth')
            .set('treetracker-api-key', apiKey)
            .send({ wallet: user.id, password: user.password })
            .expect(OK)
            .expect('Content-Type', /application\/json/)
    });
});