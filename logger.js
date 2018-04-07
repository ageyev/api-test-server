/* -- logger */
// see:
// https://github.com/winstonjs/winston-daily-rotate-file#usage
// https://stackoverflow.com/questions/45479473/log4js-javascript-create-daily-log-file
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

// Logging levels in winston conform to the severity ordering specified by RFC5424: severity of all levels is assumed to be numerically ascending from most important to least important.
//     const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     verbose: 3,
//     debug: 4,
//     silly: 5
// }

const winston = require('winston');
require('winston-daily-rotate-file');

let fileInfoLog = new (winston.transports.DailyRotateFile)(
    // // see: https://github.com/winstonjs/winston-daily-rotate-file#options
    {
        name: 'info-log',
        level: 'info',
        dirname: './logs',
        filename: '%DATE%.all.log',
        json: false,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true
    }
);

let fileErrorLog = new (winston.transports.DailyRotateFile)(
    {
        name: 'error-log',
        level: 'error',
        dirname: './logs',
        filename: '%DATE%.errors.log',
        json: false,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true

    }
);

// You can listen for the rotate custom event. The rotate event will pass two parameters to the callback (oldFilename, newFilename).
// fileLog.on('rotate', function(oldFilename, newFilename) {
//     // do something fun
// });

let consoleLog = new (winston.transports.Console)({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
});

let log = new (winston.Logger)(
    {
        transports: [
            fileInfoLog,
            fileErrorLog,
            consoleLog
        ]
    }
);

/* test logger: */
// log.error('error');
// log.warn('warn');
// log.info('info');
// log.verbose('verbose');
// log.debug('debug');
// log.silly('silly');

module.exports = log;
