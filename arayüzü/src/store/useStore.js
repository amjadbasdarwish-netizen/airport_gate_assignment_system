import { create } from 'zustand';
import client from '../api/client';

export const useStore = create((set, get) => ({
  flights: [],
  gates: [],
  assignments: {},
  graphData: null,
  chromaticNumber: 0,

  loadScenario: async (name) => {
    try {
      await client.post(`/load/${name}`);
      const res = await client.get('/flights');
      set({ flights: res.data });
      await get().solve(); // Auto-solve after loading
    } catch (err) {
      console.error("Loading Error:", err.response?.data?.detail || err.message);
    }
  },

  toggleFlight: async (id) => {
    await client.put(`/flights/${id}/toggle`);
    const res = await client.get('/flights');
    set({ flights: res.data });
    await get().solve(); // Re-calculate constraints after toggle[cite: 2, 5]
  },

  solve: async () => {
    const res = await client.post('/solve');
    set({ 
      assignments: res.data.assignments, 
      chromaticNumber: res.data.chromatic_number,
      graphData: res.data.graph_data 
    });
  }
}));