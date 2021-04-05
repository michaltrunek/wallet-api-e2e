//const request = require("supertest")("https://test-k8s.treetracker.org/wallet");
const request = require("supertest")("https://dev-k8s.treetracker.org/wallet");
const expect = require("chai").expect;
const responseStatus = require("http-status-codes");
const assert = require("./helpers/assertionLibrary.js");
const log = require("./helpers/loggingLibrary.js");
const seed = require("./database/seed.js");

module.exports = {
    request,
    expect,
    responseStatus,
    assert,
    log,
    seed
};