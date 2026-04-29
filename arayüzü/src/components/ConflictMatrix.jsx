import React from 'react';
import { useStore } from '../store/useStore';

const ConflictMatrix = () => {
  const { flights, graphData } = useStore();
  const activeFlights = flights.filter(f => f.active);

  // Check if an edge exists between two flights in the conflict graph
  const hasEdge = (id1, id2) => {
    return graphData?.edges.some(e => 
      (e.source === id1 && e.target === id2) || (e.source === id2 && e.target === id1)
    );
  };

  return (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr>
          <th className="border p-1"></th>
          {activeFlights.map(f => <th key={f.id} className="border p-1 bg-gray-100">{f.id}</th>)}
        </tr>
      </thead>
      <tbody>
        {activeFlights.map(f1 => (
          <tr key={f1.id}>
            <td className="border p-1 font-bold bg-gray-100">{f1.id}</td>
            {activeFlights.map(f2 => {
              const conflict = hasEdge(f1.id, f2.id);
              return (
                <td key={f2.id} className={`border p-2 text-center ${conflict ? 'bg-red-500 text-white' : 'bg-green-50'}`}>
                  {conflict ? '1' : '0'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConflictMatrix;