import React, { useEffect, useState } from 'react';
import IncidentCard from '../components/IncidentCard';
import { fetchIncidentById, fetchIncidents, updateIncidentStatus } from '../services/api';

function ResponderDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadIncidents() {
      try {
        const data = await fetchIncidents();
        setIncidents(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadIncidents();
  }, []);

  const handleSelectIncident = async (id) => {
    try {
      const result = await fetchIncidentById(id);
      setSelectedIncident(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (event) => {
    if (!selectedIncident) {
      return;
    }

    const nextStatus = event.target.value;

    try {
      const result = await updateIncidentStatus(selectedIncident._id, nextStatus);
      setSelectedIncident(result.data);
      setIncidents((current) =>
        current.map((item) => (item._id === result.data._id ? result.data : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20 text-white">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Responder Dashboard</h1>
          <p className="mt-2 text-slate-300">Monitor incidents, inspect details, and update response status.</p>
        </div>
        <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300">
          {incidents.length} active cases
        </div>
      </div>

      {error ? <p className="mt-4 text-red-400">{error}</p> : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-xl font-semibold">Active incidents</h2>
          <div className="mt-4 space-y-3">
            {incidents.map((incident) => (
              <IncidentCard
                key={incident._id}
                incident={incident}
                onSelect={handleSelectIncident}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
          {selectedIncident ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{selectedIncident.title}</h2>
                <span className="rounded-full bg-slate-700 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300">
                  {selectedIncident.status}
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p><span className="font-semibold text-white">Description:</span> {selectedIncident.description}</p>
                <p><span className="font-semibold text-white">Location:</span> {selectedIncident.location}</p>
                <p><span className="font-semibold text-white">Category:</span> {selectedIncident.category}</p>
                <p><span className="font-semibold text-white">Severity:</span> {selectedIncident.severity}</p>
                <p><span className="font-semibold text-white">Reported by:</span> {selectedIncident.reportedBy}</p>
                {selectedIncident.aiSummary ? (
                  <div className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-amber-300">
                    <p className="font-semibold text-white">AI summary</p>
                    <p className="mt-1">{selectedIncident.aiSummary}</p>
                  </div>
                ) : null}
              </div>

              <label className="mt-6 block text-sm font-semibold text-white">
                Update status
                <select
                  className="mt-2 w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-500"
                  value={selectedIncident.status}
                  onChange={handleStatusChange}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </label>
            </>
          ) : (
            <p className="text-slate-400">Select an incident to view its details.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default ResponderDashboard;
