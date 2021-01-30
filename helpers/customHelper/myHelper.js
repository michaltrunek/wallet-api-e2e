let Helper = codecept_helper;
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let assert = chai.assert;

class MyHelper extends Helper {

    /**
     * Assert that the expected value is included in the array/object
     * @param {Object} actual - actual value to be asserted
     * @param {Object} expected - expected value to be included
     */
    assertContains(actual, expected) {
        assert.include(actual, expected);
    };

    /**
     * Assert that the expected value equals with the actual one
     * @param {Object} actual - actual value to be asserted
     * @param {Object} expected - expected value to be compared
     * @param {string} message - explanation of assert
     */
    assertEquals(actual, expected, message) {
        assert.equal(actual, expected, message);
    };

    /**
     * Assert that the expected value not equals with the actual one
     * @param {Object} actual - actual value to be asserted
     * @param {Object} expected - expected value to be compared
     */
    assertNotEqual(actual, expected) {
        assert.notEqual(actual, expected);
    };

    /**
     *
     * @param {String} failMessage - The message to show when breaking the test
     */
    breakTest(failMessage) {
        assert.fail(0, 1, failMessage);
    }
}

module.exports = MyHelper;
