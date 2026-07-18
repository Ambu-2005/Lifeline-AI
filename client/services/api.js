// This service keeps API request logic separate from UI components.

// Helper function to get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Helper function to get request headers with auth
function getAuthHeaders() {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function registerResponder() {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: `responder-${Date.now()}`,
      password: 'demo-password-123',
      role: 'responder'
    })
  });

  if (!response.ok) {
    throw new Error('Unable to register responder');
  }

  const data = await response.json();
  localStorage.setItem('authToken', data.token);
  return data;
}

export async function fetchHealthStatus() {
  const response = await fetch('/api/health');

  if (!response.ok) {
    throw new Error('Unable to reach the server');
  }

  return response.json();
}

export async function createIncident(payload) {
  const response = await fetch('/api/incidents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Unable to create incident report');
  }

  return response.json();
}

export async function fetchIncidents() {
  const response = await fetch('/api/incidents', {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Unable to fetch incident reports');
  }

  return response.json();
}

export async function fetchIncidentById(id) {
  const response = await fetch(`/api/incidents/${id}`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Unable to fetch incident details');
  }

  return response.json();
}

export async function updateIncidentStatus(id, status) {
  const response = await fetch(`/api/incidents/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error('Unable to update incident status');
  }

  return response.json();
}
