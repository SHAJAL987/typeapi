import { Request, Response, NextFunction } from 'express';
import logging from '../../../config/logging';

const NAMESPACE = 'Sample Services';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Sample Health Check Service Called.`);

    return res.status(200).json({
        message: 'pong'
    });
};

export default { sampleHealthCheck };
