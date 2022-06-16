import http from 'http';
import express from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import logging from './config/logging';
import config from './config/config';

/* Modules Path__*/
const userModule = require('../src/modules/user');

const router = express();
const NAMESPACE = 'Server';

/* Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/* Parse the request */
router.use(
    bodyParser.urlencoded({
        extended: true
    })
);
router.use(bodyParser.json());

/* Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/* Routers */
userModule.init(router);

/* Error Handling */
router.use((req, res, next) => {
    const error = new Error('Not Found.');

    return res.status(404).json({
        message: error.message
    });
});

/* Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `server running on ${config.server.hostname}:${config.server.port}`));
