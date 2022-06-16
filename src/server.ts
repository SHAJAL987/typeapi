import http from 'http';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import logging from './config/app.logging';
import { getPort, getHostName } from './config/app.config';

/* Modules Path__*/
const userModule = require('../src/modules/user');

const app = express();
const NAMESPACE = 'Server';

/* Logging the request */
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/* Parse the request */
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

/* Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/* Routers */
userModule.init(app);

/* Global exceptin handler */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        reason: err.message
    });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception : ', err.message);
    process.exit(1);
});

/* Create the server */
const httpServer = http.createServer(app);
httpServer.listen(getPort(), () => logging.info(NAMESPACE, `server running on ${getHostName()}:${getPort()}`));
