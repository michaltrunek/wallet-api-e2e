let reporterVerbose = process.env.reporterVerbose;
let reporterSteps = process.env.reporterSteps;
let reporterDebug = process.env.reporterDebug;
const defaultHeaders = process.env.defaultHeaders;
let testFilter = process.env.testFilter;
let executors = process.env.workers;

/**
 * Setting Env Variables default
 */
let defaultHeadersPreset = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
executors = executors !== undefined ? executors : 5;

if (testFilter === undefined) testFilter = './tests/*Test.js';
reporterVerbose = !(reporterVerbose === undefined || reporterVerbose === 'false');
reporterSteps = reporterSteps === undefined || reporterSteps === 'true';
reporterDebug = !(reporterDebug === undefined || reporterDebug === 'false');
defaultHeadersPreset = (defaultHeaders === 'true' || defaultHeaders === undefined) ? defaultHeadersPreset : {};

exports.config = {
    tests: testFilter,
    output: './output',
    helpers: {
        REST: {
            resetHeaders: true,
            timeout: 60000,
            defaultHeaders: defaultHeadersPreset
        },
        MyHelper: {
            require: './helpers/customHelper/myHelper.js'
        }
    },
    include: {
        // components
        treeDetailsApi: './helpers/models/treeDetailsApi.js',
    },
    multiple: {
        parallel: {
            chunks: executors
        }
    },
    mocha: {
        "reporterOptions": {
            "mochaFile": "output/result.xml"
        }
    },
    /*mocha: {
        reporterOptions: {
            "treetracker-api": {
                stdout: "-",
                options: {
                    reportDir: './output',
                    verbose: reporterVerbose,
                    steps: reporterSteps,
                    debug: reporterDebug
                }
            },
            "mocha-junit-reporter": {
                stdout: "-",
                options: {
                    reportDir: './output',
                    mochaFile: "output/result.xml",
                    rootSuiteTitle: 'treetracker-api',
                    testsuitesTitle: 'Api Tests',
                    includePending: true,
                    toConsole: false
                }
            }
        }
    },*/
    name: 'treetracker-e2e-api-automation'
};



