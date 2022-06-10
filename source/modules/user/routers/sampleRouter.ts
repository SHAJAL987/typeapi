import express from 'express';
import sampleService from '../services/sampleService';

const router = express.Router();

router.get('/pong', sampleService.sampleHealthCheck);

export default router;
