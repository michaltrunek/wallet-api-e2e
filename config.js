const request = require("supertest")("https://test-k8s.treetracker.org/wallet");
const expect = require("chai").expect;
const responseStatus = require("http-status-codes");
const assert = require("./helpers/assertionLibrary.js");

module.exports = {
    request,
    expect,
    responseStatus,
    assert
};