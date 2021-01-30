Feature('Tree panel (TreeTracker)');

const { I, treeDetailsApi } = inject();
let treeId;

BeforeSuite(( ) => {
    treeId = '300556';
});

Scenario('Verify user panel - tree exists and is verified successfully', {retries: 2}, async () => {
    const treeDetails = await treeDetailsApi.getTreeDetailsFromApi(treeId);
    I.assertEquals(treeDetails.responseStatus, 200, 'Response status does not match!');
    treeDetailsApi.verifyTreeVerified(treeDetails);
}).tag('test');

