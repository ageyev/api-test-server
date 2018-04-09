let http = require('http');

let log = require('./logger');

// https://github.com/senchalabs/connect
let connect = require('connect');
let bodyParser = require('body-parser');

// https://github.com/imrefazekas/connect-rest
// middleware for 'connect' for building REST APIs, requires 'connect'
let Rest = require('connect-rest');

// sets up connect and adds other middlewares to parse query, parameters, content and session
// use the ones you need
let app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

// initial configuration of connect-rest. all-of-them are optional.
// default context is /api, all services are off by default
let options = {
    context: '/api'
    // context: '/api',
    // logger:{ file: 'mochaTest.log', level: 'debug' },
    // apiKeys: [ '849b7648-14b8-4154-9ef2-8d1dc4c2b7e9' ],
    // discover: { path: 'discover', secure: true },
    // proto: { path: 'proto', secure: true }
};
let rest = Rest.create(options);

// adds connect-rest middleware to connect
app.use(rest.processRequest());

// http://localhost:3000/api/
let apiDefault = require('./api/apiDefault');
rest.post('/', apiDefault);
rest.get('/', apiDefault);

app.use('/', function (req, res, next) {
        // req is the Node.js http request object
        // res is the Node.js http response object
        // next is a function to call to invoke the next middleware
        let html = "<html><head><title>Welcome</title></head><body><br><div>Hi, user!</div><div><a href='api/'>api</a></div></body>";
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
);

//create node.js http server and listen on port
let port = 3000;
log.info('listening on port', port);
log.info('http://localhost:' + port);
http.createServer(app).listen(port);

