import { useState } from "react";
import { useStore } from "./store/useStore";
import GanttChart from "./components/GanttChart";
import ConflictMatrix from "./components/ConflictMatrix";
import ConflictGraph from "./components/ConflictGraph";

export default function App() {
  const { loadScenario, chromaticNumber, flights, toggleFlight } = useStore();
  const [activeTab, setActiveTab] = useState("gantt");

  const activeCount = flights.filter((f) => f.active).length;

  const tabs = [
    {
      id: "gantt",
      label: "Schedule",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      id: "matrix",
      label: "Conflict Matrix",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
    {
      id: "graph",
      label: "Conflict Graph",
      icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Header & Scenario Controls */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Gate <span className="text-indigo-600">Allocator</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => loadScenario("scenario_light")}
              className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Light
            </button>
            <button
              onClick={() => loadScenario("scenario_moderate")}
              className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Moderate
            </button>
            <button
              onClick={() => loadScenario("scenario_peak")}
              className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
            >
              Peak
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">Flights</span>
                <span className="text-slate-900">{activeCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">
                  Gates Needed/chromatic number{" "}
                </span>
                <span className="text-indigo-600">{chromaticNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-all font-semibold text-sm
                  ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={tab.icon}
                  />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Tab Content */}
        <div className="animate-in fade-in duration-500">
          {activeTab === "gantt" && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Gate Assignment Schedule
              </h2>
              <GanttChart />
            </section>
          )}

          {activeTab === "matrix" && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Conflict Matrix
              </h2>
              <ConflictMatrix />
            </section>
          )}

          {activeTab === "graph" && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Colored Conflict Graph
              </h2>
              <ConflictGraph />
            </section>
          )}
        </div>

        {/* Flight Inventory (Persistent at bottom) */}
        <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Flight Inventory</h2>
              <p className="text-slate-400 text-sm">
                Toggle flights to see real-time algorithmic adjustments.
              </p>
            </div>
            <div className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">
              {activeCount} Active / {flights.length} Total
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {flights.map((f) => (
              <button
                key={f.id}
                onClick={() => toggleFlight(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border
                  ${
                    f.active
                      ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20"
                      : "bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-750"
                  }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${f.active ? "bg-indigo-400" : "bg-slate-600"}`}
                ></span>
                {f.id}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto py-8 text-center text-slate-400 text-xs">
        Airport Flight Gate Assignment System • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
