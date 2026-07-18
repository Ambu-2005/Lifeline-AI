import React from 'react';

function IncidentCard({ incident, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(incident._id)}
      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 p-4 text-left transition hover:border-emerald-500 hover:bg-slate-800"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{incident.title}</h3>
        <span className="rounded-full bg-slate-700 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300">
          {incident.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{incident.description}</p>
      <p className="mt-2 text-xs text-slate-400">
        {incident.location} • {incident.category} • {incident.severity}
      </p>
    </button>
  );
}

export default IncidentCard;
