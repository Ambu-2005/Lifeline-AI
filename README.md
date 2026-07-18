# LifeLine AI

LifeLine AI is an AI-powered emergency response web application built for the Idea2Impact 2026 Hackathon. It helps users report emergencies, stores incident data in MongoDB, generates AI-driven summaries, and gives responders a dashboard-style control center for monitoring and updating response status.

## Problem Statement

Emergency reporting systems are often slow, fragmented, and difficult to interpret under pressure. LifeLine AI aims to simplify that process by combining:

- fast incident reporting
- structured data capture
- AI-generated emergency summaries
- a responder dashboard for coordination

## Core Features

- Report emergencies through a simple web form
- Store incidents in MongoDB
- Generate AI summaries using Gemini
- View incidents through a location-aware dashboard experience
- Update incident status from open to in-progress to resolved
- Support role-based access for public users and responders

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB
- AI: Gemini API
- Authentication: JWT + bcrypt

## Project Structure

- client/: React frontend application
  - components/: reusable UI components
  - pages/: dashboard and page-level views
  - services/: API client logic
- server/: Express backend application
  - controllers/: request handlers
  - models/: MongoDB schemas
  - routes/: API endpoints
  - middleware/: auth and access control
  - services/: AI integrations

## Setup Instructions

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the backend
   ```bash
   npm run dev --workspace server
   ```

3. Start the frontend
   ```bash
   npm run dev --workspace client
   ```

4. Open the frontend in your browser at:
   ```text
   http://localhost:3002/
   ```

## Environment Variables

Create a server/.env file with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lifelineai
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=lifeline-secret
```

## API Endpoints

### Health
- GET /api/health

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Incidents
- POST /api/incidents
- GET /api/incidents
- GET /api/incidents/:id
- PATCH /api/incidents/:id/status

## Demo Flow for Judges

1. Show the incident reporting form.
2. Submit a sample emergency report.
3. Highlight the AI-generated summary.
4. Show the location-aware incident view.
5. Open the responder dashboard and update the incident status.
6. Explain how the app separates public reporting from responder coordination.

## Judges' Talking Points

- The app combines AI and real-world emergency workflows.
- The architecture is modular and easy to explain.
- The project demonstrates full-stack development with authentication, database persistence, and API integration.
- The solution is designed to be expanded into a more complete emergency management platform.

## Future Enhancements

- Real map integration with Google Maps or Mapbox
- SMS or WhatsApp alert notifications
- Live location sharing
- Role-based admin panels
- Analytics and incident trend reporting
