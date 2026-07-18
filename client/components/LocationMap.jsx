import React, { useMemo, useState } from 'react';

const LOCATION_HINTS = [
  { keyword: 'north campus', x: 70, y: 30 },
  { keyword: 'main street', x: 35, y: 60 },
  { keyword: 'oak avenue', x: 72, y: 72 },
  { keyword: 'central', x: 48, y: 46 },
  { keyword: 'river', x: 20, y: 25 },
  { keyword: 'downtown', x: 52, y: 52 }
];

function getMarkerPosition(location) {
  const normalized = (location || '').toLowerCase();

  const match = LOCATION_HINTS.find((hint) => normalized.includes(hint.keyword));
  return match ? { x: match.x, y: match.y } : { x: 50, y: 50 };
}

function getSeverityColor(severity) {
  switch (severity) {
    case 'critical':
      return 'bg-red-500';
    case 'high':
      return 'bg-amber-500';
    case 'medium':
      return 'bg-sky-500';
    default:
      return 'bg-emerald-500';
  }
}

function LocationMap({ incidents }) {
  const [activeIncident, setActiveIncident] = useState(null);

  const markers = useMemo(() => {
    return incidents.map((incident) => ({
      ...incident,
      ...getMarkerPosition(incident.location)
    }));
  }, [incidents]);

  const selected = activeIncident || markers[0] || null;

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900 p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Location-aware incident view</h2>
          <p className="mt-1 text-sm text-slate-400">
            A simple map-style overview of active incidents by location.
          </p>
        </div>
        <div className="rounded border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300">
          {incidents.length} incidents
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative h-80 overflow-hidden rounded border border-slate-700 bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.25),_transparent_45%)]" />
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {markers.map((incident) => (
            <button
              key={incident._id}
              type="button"
              onClick={() => setActiveIncident(incident)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
              title={incident.title}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-full border border-white/50 ${getSeverityColor(incident.severity)}`} />
            </button>
          ))}
        </div>

        <div className="rounded border border-slate-700 bg-slate-800 p-4">
          {selected ? (
            <>
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{selected.description}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-400">
                <p><span className="font-semibold text-white">Location:</span> {selected.location}</p>
                <p><span className="font-semibold text-white">Severity:</span> {selected.severity}</p>
                <p><span className="font-semibold text-white">Status:</span> {selected.status}</p>
              </div>
              {selected.aiSummary ? (
                <div className="mt-4 rounded bg-slate-700 p-3 text-sm text-amber-300">
                  {selected.aiSummary}
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-slate-400">No incidents available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LocationMap;
