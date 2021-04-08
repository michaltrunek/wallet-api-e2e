/**
 * log details from current failed test case into console
 * @param {Object} currentTestResponse
 * @param {Object} currentTestInfo
 */
function reportExtendedOnFailure(currentTestResponse, currentTestInfo) {
    const errorBody = currentTestResponse && currentTestResponse.body;

    if (currentTestInfo.state === 'failed' && errorBody) {
        console.log('**************');
        console.log(currentTestInfo.title);
        console.log(errorBody);
        console.log('**************');
    }
}

module.exports = {
    reportExtendedOnFailure
};
