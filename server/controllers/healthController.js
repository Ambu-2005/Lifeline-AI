// Controller for health-check requests. It keeps route logic separate from business logic.
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'LifeLine AI server is running',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealth
};
