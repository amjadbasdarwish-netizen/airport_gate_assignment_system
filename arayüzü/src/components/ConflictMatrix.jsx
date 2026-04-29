import React from 'react';
import { useStore } from '../store/useStore';

const ConflictMatrix = () => {
  const { flights, graphData } = useStore();
  const activeFlights = flights.filter(f => f.active);

  const hasEdge = (id1, id2) => {
    return graphData?.edges.some(e => 
      (e.source === id1 && e.target === id2) || (e.source === id2 && e.target === id1)
    );
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="p-3 text-slate-500 font-medium sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Flight</th>
            {activeFlights.map(f => (
              <th key={f.id} className="p-3 text-slate-700 font-semibold min-w-[45px] text-center border-r border-slate-100 last:border-r-0">
                {f.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeFlights.map(f1 => (
            <tr key={f1.id} className="border-b border-slate-100 last:border-b-0 group">
              <td className="p-3 font-bold text-slate-700 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-200">
                {f1.id}
              </td>
              {activeFlights.map(f2 => {
                const conflict = hasEdge(f1.id, f2.id);
                const isSelf = f1.id === f2.id;
                
                return (
                  <td 
                    key={f2.id} 
                    className={`p-3 text-center transition-colors border-r border-slate-50 last:border-r-0
                      ${isSelf ? 'bg-slate-50 text-slate-300' : 
                        conflict ? 'bg-rose-50 text-rose-600 font-bold' : 'bg-emerald-50/30 text-emerald-600/50'}`}
                  >
                    {isSelf ? '-' : conflict ? '1' : '0'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {activeFlights.length === 0 && (
        <div className="p-8 text-center text-slate-400 italic">
          No active flights to display matrix
        </div>
      )}
    </div>
  );
};

export default ConflictMatrix;
