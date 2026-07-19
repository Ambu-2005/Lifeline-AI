// This service keeps API request logic separate from UI components.

const API_BASE = "https://lifeline-ai-vpnz.onrender.com";

// Helper function to get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem("authToken");
}

// Helper function to get request headers with auth
function getAuthHeaders() {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Register demo responder
export async function registerResponder() {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `responder-${Date.now()}`,
      password: "demo-password-123",
      role: "responder",
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to register responder");
  }

  const data = await response.json();
  localStorage.setItem("authToken", data.token);

  return data;
}

// Backend health
export async function fetchHealthStatus() {
  const response = await fetch(`${API_BASE}/api/health`);

  if (!response.ok) {
    throw new Error("Unable to reach the server");
  }

  return response.json();
}

// Create incident
export async function createIncident(payload) {
  const response = await fetch(`${API_BASE}/api/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to create incident report");
  }

  return response.json();
}

// Fetch all incidents
export async function fetchIncidents() {
  const response = await fetch(`${API_BASE}/api/incidents`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unable to fetch incident reports");
  }

  return response.json();
}

// Fetch incident by ID
export async function fetchIncidentById(id) {
  const response = await fetch(`${API_BASE}/api/incidents/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unable to fetch incident details");
  }

  return response.json();
}

// Update incident status
export async function updateIncidentStatus(id, status) {
  const response = await fetch(`${API_BASE}/api/incidents/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Unable to update incident status");
  }

  return response.json();
}