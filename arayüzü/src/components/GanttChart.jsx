import React from 'react';
import { useStore } from '../store/useStore';

const GanttChart = () => {
  const { flights, assignments, gates } = useStore();
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  return (
    <div className="overflow-x-auto p-4 bg-white rounded shadow">
      <div className="min-w-[1200px]">
        {/* Time Header */}
        <div className="flex border-b mb-2">
          <div className="w-24 font-bold">Gate</div>
          {hours.map(h => <div key={h} className="flex-1 text-xs text-center border-l">{h}</div>)}
        </div>

        {/* Gate Rows */}
        {gates.map(gate => (
          <div key={gate.id} className="flex h-12 border-b items-center relative">
            <div className="w-24 font-bold text-sm bg-gray-50">{gate.id}</div>
            
            {/* Flight Blocks */}
            {flights.filter(f => assignments[f.id] === gate.id && f.active).map(f => {
              const startPercent = (parseInt(f.arrival.split(':')[0]) * 60 + parseInt(f.arrival.split(':')[1])) / 1440 * 100;
              const endPercent = (parseInt(f.departure.split(':')[0]) * 60 + parseInt(f.departure.split(':')[1])) / 1440 * 100;
              
              return (
                <div 
                  key={f.id}
                  className="absolute bg-blue-500 text-white text-[10px] rounded p-1 shadow-sm flex items-center justify-center"
                  style={{ left: `calc(6rem + ${startPercent}%)`, width: `${endPercent - startPercent}%`, height: '70%' }}
                >
                  {f.id}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;