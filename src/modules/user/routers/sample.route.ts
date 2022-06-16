import express from 'express';
import sampleService from '../services/sample.service';

const router = express.Router();

router.get('/pong', sampleService.sampleHealthCheck);

export default router;
