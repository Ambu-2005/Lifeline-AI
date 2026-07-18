const Incident = require('../models/Incident');
const { generateIncidentSummary } = require('../services/geminiService');

// Create a new incident report
const createIncident = async (req, res) => {
  try {
    const incidentData = req.body;
    const aiSummary = await generateIncidentSummary(incidentData);

    const incident = new Incident({
      ...incidentData,
      aiSummary
    });

    const savedIncident = await incident.save();

    res.status(201).json({
      success: true,
      data: savedIncident
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all incident reports
const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get one incident by id
const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }

    res.status(200).json({
      success: true,
      data: incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update incident status
const updateIncidentStatus = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }

    res.status(200).json({
      success: true,
      data: incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus
};
