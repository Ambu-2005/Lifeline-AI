const express = require('express');
const { getHealth } = require('../controllers/healthController');

const router = express.Router();

// Define the health endpoint: GET /api/health
router.get('/health', getHealth);

module.exports = router;
