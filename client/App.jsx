import React, { useEffect, useState } from 'react';
import LocationMap from './components/LocationMap';
import ResponderDashboard from './pages/ResponderDashboard';
import { createIncident, fetchHealthStatus, fetchIncidents, registerResponder } from './services/api';

const emptyForm = {
  title: '',
  description: '',
  category: 'other',
  severity: 'medium',
  location: '',
  reportedBy: '',
  contactPhone: ''
};

function App() {
  const [health, setHealth] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        // Auto-authenticate as responder for demo
        await registerResponder();
        
        const healthData = await fetchHealthStatus();
        const incidentsData = await fetchIncidents();
        setHealth(healthData);
        setIncidents(incidentsData.data || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const result = await createIncident(form);
      setIncidents([result.data, ...incidents]);
      setForm(emptyForm);
      setMessage('Incident report saved successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">LifeLine AI</p>
              <h1 className="mt-2 text-4xl font-bold">AI-powered emergency response</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Report incidents, review live summaries, and coordinate response efforts from a single control surface.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <p className="font-semibold">Live demo mode</p>
              <p className="mt-1">Fast incident intake + AI assistance</p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wide text-slate-400">Backend health</p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-300">
                Connected
              </span>
            </div>
            {health ? (
              <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-sm text-emerald-300">
                {JSON.stringify(health, null, 2)}
              </pre>
            ) : (
              <p className="mt-4 text-slate-300">{error || 'Connecting to server...'}</p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20">
            <h2 className="text-xl font-semibold">Report an incident</h2>
            <p className="mt-2 text-sm text-slate-400">Capture the essentials quickly so responders can act immediately.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none ring-0 transition focus:border-emerald-500"
                placeholder="Title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                required
              />
              <textarea
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                placeholder="Description"
                rows="3"
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                required
              />
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className="rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                >
                  <option value="medical">Medical</option>
                  <option value="fire">Fire</option>
                  <option value="accident">Accident</option>
                  <option value="flood">Flood</option>
                  <option value="crime">Crime</option>
                  <option value="other">Other</option>
                </select>
                <select
                  className="rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                  value={form.severity}
                  onChange={(event) => setForm({ ...form, severity: event.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <input
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                placeholder="Location"
                value={form.location}
                onChange={(event) => setForm({ ...form, location: event.target.value })}
                required
              />
              <input
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                placeholder="Reporter name"
                value={form.reportedBy}
                onChange={(event) => setForm({ ...form, reportedBy: event.target.value })}
              />
              <input
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                placeholder="Contact phone"
                value={form.contactPhone}
                onChange={(event) => setForm({ ...form, contactPhone: event.target.value })}
              />
              <button className="rounded bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500" type="submit">
                Save report
              </button>
            </form>
            {message ? <p className="mt-3 text-emerald-400">{message}</p> : null}
            {error ? <p className="mt-3 text-red-400">{error}</p> : null}
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Recent incidents</h2>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-400">
              {incidents.length} total
            </span>
          </div>
          {incidents.length === 0 ? (
            <p className="mt-3 text-slate-400">No incidents reported yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div key={incident._id} className="rounded-xl border border-slate-800 bg-slate-800/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold">{incident.title}</h3>
                    <span className="rounded-full bg-slate-700 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-300">
                      {incident.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{incident.description}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {incident.location} • {incident.category} • {incident.severity}
                  </p>
                  {incident.aiSummary ? (
                    <p className="mt-3 rounded-lg bg-slate-700/70 p-2 text-sm text-amber-300">
                      {incident.aiSummary}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-8">
          <LocationMap incidents={incidents} />
        </div>

        <div className="mt-8">
          <ResponderDashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
