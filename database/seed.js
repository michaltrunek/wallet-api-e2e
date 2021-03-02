/*
 * seed data to DB for testing
 */
const uuid = require("uuid");
const knex = require("./knex");

const apiKey = "FORTESTFORTESTFORTESTFORTESTFORTEST";

const wallet = {
  id: uuid.v4(),
  name: "walletA",
  password: "test1234",
  passwordHash:
    "31dd4fe716e1a908f0e9612c1a0e92bfdd9f66e75ae12244b4ee8309d5b869d435182f5848b67177aa17a05f9306e23c10ba41675933e2cb20c66f1b009570c1",
  salt: "TnDe2LDPS7VaPD9GQWL3fhG4jk194nde",
  type: "p",
};

const capture = {
  id: uuid.v4(),
};

const captureB = {
  id: uuid.v4(),
};

const token = {
  id: uuid.v4(),
};

const walletB = {
  id: uuid.v4(),
  name: "walletB",
  password: "test1234",
  passwordHash:
    "31dd4fe716e1a908f0e9612c1a0e92bfdd9f66e75ae12244b4ee8309d5b869d435182f5848b67177aa17a05f9306e23c10ba41675933e2cb20c66f1b009570c1",
  salt: "TnDe2LDPS7VaPD9GQWL3fhG4jk194nde",
  type: "p",
};

const walletC = {
  id: uuid.v4(),
  name: "walletC",
  password: "test1234",
  passwordHash:
    "31dd4fe716e1a908f0e9612c1a0e92bfdd9f66e75ae12244b4ee8309d5b869d435182f5848b67177aa17a05f9306e23c10ba41675933e2cb20c66f1b009570c1",
  salt: "TnDe2LDPS7VaPD9GQWL3fhG4jk194nde",
  type: "p",
};

const tokenB = {
  id: uuid.v4(),
  capture_id: captureB.id,
  wallet_id: walletC.id,
};

const storyOfThisSeed = `
    api_key: ${apiKey}
    a wallet: #${wallet.id}
      type: ${wallet.type}
      name: ${wallet.name}
      wallet: ${wallet.wallet}
      password: ${wallet.password}

    a capture: #${capture.id}

    a token: #${token.id}
      capture: #${capture.id}
      wallet: #${wallet.id}

    wallet #${wallet.id} planted a capture #${capture.id}, get a token #${
  token.id
}

    walletB: 
      ${JSON.stringify(walletB, undefined, 2)}

    walletC (walletC was managed by walletB:#{walletB.id}): 
      ${JSON.stringify(walletC, undefined, 2)}

    Another token, belongs to walletC:
      ${JSON.stringify(tokenB, undefined, 2)}

    Another capture: #${captureB.id}


`;
console.debug(
  "--------------------------story of database ----------------------------------",
  storyOfThisSeed,
  "-----------------------------------------------------------------------------"
);

async function seed() {
  console.log("seed api key");
  //TODO should use appropriate hash & salt to populate this table
  await knex("api_key").insert({
    key: apiKey,
    tree_token_api_access: true,
    hash: "test",
    salt: "test",
    name: "test",
  });

  // wallet
  await knex("wallet").insert({
    id: wallet.id,
    type: wallet.type,
    name: wallet.name,
    password: wallet.passwordHash,
    salt: wallet.salt,
  });

  //walletB
  await knex("wallet").insert({
    id: walletB.id,
    type: walletB.type,
    name: walletB.name,
    password: walletB.passwordHash,
    salt: walletB.salt,
  });

  //walletC
  await knex("wallet").insert({
    id: walletC.id,
    type: walletC.type,
    name: walletC.name,
    password: walletC.passwordHash,
    salt: walletC.salt,
  });

  //relationships: 'walletB' manage 'walletC'
  await knex("wallet_trust").insert({
    type: "manage",
    actor_wallet_id: walletB.id,
    target_wallet_id: walletC.id,
    originator_wallet_id: walletB.id,
    request_type: "manage",
    state: "trusted",
  });

  // token
  console.log("seed token");
  await knex("token").insert({
    id: token.id,
    capture_id: capture.id,
    wallet_id: wallet.id,
  });

  await knex("token").insert(tokenB);
}

async function clear() {
  console.log("clearing db");

  await knex("api_key").where("key", apiKey).del();

  await knex("transaction").where("source_wallet_id", wallet.id).del();
  await knex("transaction").where("source_wallet_id", walletB.id).del();
  await knex("transaction").where("source_wallet_id", walletC.id).del();

  await knex("token").where("id", token.id).del();
  await knex("token").where("id", tokenB.id).del();

  await knex("wallet").where("id", wallet.id).del();
  await knex("wallet").where("id", walletB.id).del();
  await knex("wallet").where("id", walletC.id).del();

  await knex("wallet_trust").where("actor_wallet_id", wallet.id).del();
  await knex("wallet_trust").where("actor_wallet_id", walletB.id).del();
  await knex("wallet_trust").where("actor_wallet_id", walletC.id).del();

  await knex("transfer").where("originator_wallet_id", walletC.id).del();
  await knex("transfer").where("originator_wallet_id", walletC.id).del();
  await knex("transfer").where("originator_wallet_id", walletC.id).del();

  console.log("done clearing db");
}

module.exports = {
  seed,
  clear,
  apiKey,
  wallet,
  walletB,
  walletC,
  capture,
  token,
  tokenB,
  captureB,
};
