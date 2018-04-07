//
// http://localhost:3000/api/
// run: nodejs ./app.js

let log = require('../logger');

let apiDefault = function (request, content) {

    try {
        log.info('Received headers:' + JSON.stringify(request.headers));
        log.info('Received parameters:' + JSON.stringify(request.parameters));
        log.info('Received JSON object:' + JSON.stringify(content)); // body
        //
        // log.debug(content.param1);
        // log.debug(content.param2);
        // log.debug(content.param3);
    } catch (e) {
        log.error(e);
    }

    let resObj = {}; // obj to return
    // resObj.message = "Hi, user!";
    // resObj.number = 53;
    // resObj.boolean = true;
    // resObj.obj = {text: "some text", bool: false, float: 11.03};
    resObj.requestHeaders = request.headers;
    resObj.requestParameters = request.parameters;
    resObj.requestBody = content;

    return resObj;
};

module.exports = apiDefault;