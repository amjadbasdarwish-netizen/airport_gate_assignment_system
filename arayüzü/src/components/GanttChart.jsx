import React from 'react';
import { useStore } from '../store/useStore';

const GanttChart = () => {
  const { flights, assignments, gates, gateColors } = useStore();
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  return (
    <div className="overflow-x-auto p-6 bg-slate-50 rounded-xl shadow-inner border border-slate-200">
      <div className="min-w-[1200px] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Time Header */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <div className="w-28 font-bold text-slate-500 text-xs p-3 border-r border-slate-200 flex items-center justify-center bg-slate-100/50 uppercase tracking-wider">Gate</div>
          {hours.map(h => (
            <div key={h} className="flex-1 text-[10px] text-slate-400 text-center border-l border-slate-100 py-2 font-mono">
              {h}
            </div>
          ))}
        </div>

        {/* Gate Rows */}
        {gates.map((gate, idx) => (
          <div key={gate.id} className={`flex h-14 border-b border-slate-100 items-center relative hover:bg-slate-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'}`}>
            <div className="w-28 font-bold text-sm text-slate-700 px-4 flex items-center h-full border-r border-slate-200 bg-slate-50/50 z-10 sticky left-0">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: gateColors[gate.id] || '#cbd5e1' }}></span>
              {gate.id}
            </div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0 flex pointer-events-none">
              <div className="w-28"></div>
              {hours.map(h => <div key={h} className="flex-1 border-l border-slate-50 h-full"></div>)}
            </div>

            {/* Flight Blocks */}
            {flights.filter(f => assignments[f.id] === gate.id && f.active).map(f => {
              const startTotalMinutes = parseInt(f.arrival.split(':')[0]) * 60 + parseInt(f.arrival.split(':')[1]);
              const endTotalMinutes = parseInt(f.departure.split(':')[0]) * 60 + parseInt(f.departure.split(':')[1]);
              
              const startPercent = (startTotalMinutes / 1440) * 100;
              const endPercent = (endTotalMinutes / 1440) * 100;
              const durationPercent = endPercent - startPercent;
              
              const color = gateColors[gate.id] || '#3b82f6';
              
              return (
                <div 
                  key={f.id}
                  className="absolute text-white text-[11px] rounded-md shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-[1.02] hover:z-20 cursor-pointer overflow-hidden border border-white/20"
                  style={{ 
                    left: `calc(7rem + ${startPercent}%)`, 
                    width: `${durationPercent}%`, 
                    height: '75%',
                    backgroundColor: color,
                    boxShadow: `0 4px 12px -2px ${color}44`
                  }}
                  title={`${f.id}: ${f.arrival} - ${f.departure}`}
                >
                  <span className="font-bold drop-shadow-sm">{f.id}</span>
                  <span className="text-[8px] opacity-80 font-mono">{f.arrival}-{f.departure}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {gates.length === 0 && (
        <div className="p-12 text-center text-slate-400 bg-white rounded-lg border border-dashed border-slate-300">
          Load a scenario to see the schedule
        </div>
      )}
    </div>
  );
};

export default GanttChart;
