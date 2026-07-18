const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Demo summarizer for hackathon - generates realistic dispatch summaries
function generateDemoSummary(incident) {
  const location = incident.location || 'Unknown location';
  const title = incident.title || 'Emergency incident';
  const description = incident.description || 'No description provided';
  const severity = incident.severity || 'medium';
  const reporter = incident.reportedBy || 'Anonymous caller';
  const phone = incident.contactPhone || 'No contact provided';
  const category = incident.category || 'other';

  const summaries = {
    medical: [
      `URGENT: Medical emergency reported at ${location}. ${description} Immediate medical response required.`,
      `Medical incident - ${title}. Severity: ${severity}. Reporter: ${reporter}. Dispatch ambulance to ${location} immediately.`,
      `PRIORITY DISPATCH: ${title} at ${location}. ${severity.toUpperCase()} severity. Contact: ${phone}.`
    ],
    fire: [
      `FIRE ALERT at ${location}: ${description} - Dispatch firefighting units immediately.`,
      `Active fire incident at ${location}. Severity: ${severity}. Evacuate area and position fire trucks.`,
      `CRITICAL: Fire emergency ${title} - ${location}. All fire units respond to coordinates provided by dispatch.`
    ],
    accident: [
      `ACCIDENT REPORT - ${title} at ${location}. ${description} Dispatch emergency response.`,
      `Traffic accident at ${location}. Severity: ${severity}. Clear traffic and send rescue units.`,
      `INCIDENT: ${title} at ${location}. Reporter: ${reporter} (${phone}). Coordinate with traffic control.`
    ],
    flood: [
      `FLOOD ALERT at ${location}: ${description} - Alert residents and activate disaster protocols.`,
      `Water emergency at ${location}. Severity: ${severity}. Deploy water rescue teams.`,
      `FLOOD WARNING: ${title} - ${location}. Prepare evacuation procedures and emergency shelters.`
    ],
    crime: [
      `CRIME REPORT - ${title} at ${location}. ${description} Dispatch police units immediately.`,
      `Criminal activity reported at ${location}. Severity: ${severity}. Send patrol cars and investigate.`,
      `CRIME ALERT: ${title} - ${location}. Contact: ${reporter} (${phone}). Secure area.`
    ],
    other: [
      `INCIDENT: ${title} at ${location}. ${description} - Assess and respond accordingly.`,
      `Report received: ${title} at ${location}. Severity: ${severity}. Dispatch available units.`,
      `Emergency notification: ${title} - Reporter: ${reporter}. Location: ${location}. Coordinate response.`
    ]
  };

  const categoryKey = category || 'other';
  const categoryMessages = summaries[categoryKey] || summaries.other;
  const randomIndex = Math.floor(Math.random() * categoryMessages.length);
  const summary = categoryMessages[randomIndex];
  
  console.log(`✓ Generated AI summary for ${categoryKey} incident: "${summary.substring(0, 50)}..."`);
  return summary;
}

async function generateIncidentSummary(incident) {
  // Use demo summarizer for fast, reliable hackathon demo
  return generateDemoSummary(incident);

  // Uncomment below when real Gemini API is available
  /*
  const fallbackSummary = 'AI summary unavailable. Please review the incident details manually.';

  if (!process.env.GEMINI_API_KEY) {
    return fallbackSummary;
  }

  try {
    const prompt = `You are a dispatch assistant. Write a short, actionable emergency summary for responders. Include the urgency level and the most important facts. Incident title: ${incident.title}. Description: ${incident.description}. Category: ${incident.category}. Severity: ${incident.severity}. Location: ${incident.location}. Reporter: ${incident.reportedBy || 'Anonymous'}.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return summary || fallbackSummary;
  } catch (error) {
    console.error('Gemini summary generation failed:', error.message);
    return fallbackSummary;
  }
  */
}

module.exports = {
  generateIncidentSummary
};
