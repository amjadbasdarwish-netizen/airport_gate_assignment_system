import { useStore } from './store/useStore';
import GanttChart from './components/GanttChart';
import ConflictMatrix from './components/ConflictMatrix';
import ConflictGraph from './components/ConflictGraph';

export default function App() {
  const { loadScenario, chromaticNumber, flights, toggleFlight } = useStore();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Airport Gate Allocation (CSP)</h1>
      
      <div className="my-4 flex gap-4">
        <button onClick={() => loadScenario('scenario_light')} className="btn">Load Light</button>
        <button onClick={() => loadScenario('scenario_moderate')} className="btn">Load Moderate</button>
        <div className="ml-auto font-mono">Chromatic Number: {chromaticNumber}</div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <section className="col-span-2 border p-4">
          <h2 className="font-bold">1) Gantt Chart (Gate Assignments)</h2>
          <GanttChart />
        </section>

        <section className="border p-4">
          <h2 className="font-bold">2) Conflict Matrix</h2>
          <ConflictMatrix />
        </section>

        <section className="border p-4">
          <h2 className="font-bold">3) Colored Conflict Graph</h2>
          <ConflictGraph />
        </section>
      </div>

      <footer className="mt-8">
        <h2 className="font-bold">Flight Controls</h2>
        <div className="flex flex-wrap gap-2">
          {flights.map(f => (
            <button 
              key={f.id} 
              onClick={() => toggleFlight(f.id)}
              className={`p-2 border ${f.active ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              {f.id} ({f.active ? 'Active' : 'Disabled'})
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}