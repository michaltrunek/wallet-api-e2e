'use strict';

const { I } = inject();

module.exports = {

    endpoints: {
        getTree: (treeId) => `https://treetracker.org/api/web/tree?tree_id=${treeId}`
    },

    /**
     * Get tree details
     * @param {String} treeId - ID of a tree to get
     */
    getTreeDetailsFromApi: async function (treeId) {
        const response = await I.sendGetRequest(this.endpoints.getTree(treeId));
        const { status } = response;
        const { id, lat, lon, approved, first_name } = response.data;

        return {
            responseStatus: status,
            treeId: id,
            latitude: lat,
            longitude: lon,
            verified: approved,
            firstName: first_name
        }
    },

    /**
     * Assert tree verified
     * @param {Object} treeDetails
     */
    verifyTreeVerified: function (treeDetails) {
        I.assertEquals(treeDetails.verified, true, 'Tree is not verified!');
    }
};
