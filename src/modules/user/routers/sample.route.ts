import express from 'express';
import simpleService from '../services/sample.service';

const router = express.Router();

router.get('/pong', simpleService.sampleHealthCheck);

export default router;
