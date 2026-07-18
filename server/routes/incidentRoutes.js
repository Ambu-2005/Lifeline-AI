const express = require('express');
const {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus
} = require('../controllers/incidentController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// POST /api/incidents -> create a new incident report
router.post('/incidents', createIncident);

// GET /api/incidents -> fetch all incident reports
router.get('/incidents', protect, getIncidents);

// GET /api/incidents/:id -> fetch one incident report
router.get('/incidents/:id', protect, getIncidentById);

// PATCH /api/incidents/:id/status -> update incident status
router.patch('/incidents/:id/status', protect, authorizeRoles('responder', 'admin'), updateIncidentStatus);

module.exports = router;
