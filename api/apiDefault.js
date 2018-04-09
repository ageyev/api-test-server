//
// http://localhost:3000/api/
// run: nodejs ./app.js

let log = require('../logger');

// persistent datastore with automatic loading
// https://github.com/louischatriot/nedb
let NeDB = require('nedb');

let db = new NeDB({filename: './db/content.db', autoload: true});
let headers = new NeDB({filename: './db/headers.db', autoload: true});
let parameters = new NeDB({filename: './db/parameters.db', autoload: true});


let apiDefault = function (request, content) {

    try {
        log.info('Received headers:' + JSON.stringify(request.headers));
        log.info('Received parameters:' + JSON.stringify(request.parameters));
        log.info('Received JSON object:' + JSON.stringify(content)); // body
        //
        headers.insert(request.headers, function (error, newDoc) {   // Callback is optional
                // newDoc is the newly inserted document, including its _id
                if (!error) {
                    log.debug(newDoc)
                } else {
                    log.error(error);
                }
            }
        );
        parameters.insert(request.parameters, function (error, newDoc) {   // Callback is optional
                // newDoc is the newly inserted document, including its _id
                if (!error) {
                    log.debug(newDoc)
                } else {
                    log.error(error);
                }
            }
        );
        db.insert(content, function (error, newDoc) {   // Callback is optional
                // newDoc is the newly inserted document, including its _id
                if (!error) {
                    log.debug(newDoc)
                } else {
                    log.error(error);
                }
            }
        );
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