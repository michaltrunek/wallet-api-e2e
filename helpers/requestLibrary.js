const { request } = require("../config");

async function sendGetRequest(body) {

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
