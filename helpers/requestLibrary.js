const { request } = require("../config");

async function sendGetRequest(url, headers, body = {}) {
    return request
        .get(url)
        .set(headers)
        .send(body);
}

async function sendPostRequest(url, headers, body) {
    return request
        .post(url)
        .set(headers)
        .send(body);
}

module.exports = {
    sendGetRequest,
    sendPostRequest
};
