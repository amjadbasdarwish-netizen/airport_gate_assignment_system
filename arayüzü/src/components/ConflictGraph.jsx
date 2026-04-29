import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import { useStore } from "../store/useStore";

const ConflictGraph = () => {
  const cyRef = useRef(null);
  const { graphData, assignments, gateColors } = useStore();

  useEffect(() => {
    if (!graphData || !cyRef.current) return;

    const elements = [
      ...graphData.nodes.map((n) => ({
        data: {
          id: n.id,
          label: n.id,
          gate: assignments[n.id],
          color: gateColors[assignments[n.id]] || "#666",
        },
      })),
      ...graphData.edges.map((e) => ({
        data: { source: e.source, target: e.target },
      })),
    ];

    cytoscape({
      container: cyRef.current,
      elements: elements,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "data(color)",
            color: "#fff",
            "text-valign": "center",
            "text-halign": "center",
            width: 50,
            height: 50,
            "font-size": "12px",
            "font-weight": "bold",
            "border-width": 3,
            "border-color": "#fff",
            "text-outline-width": 2,
            "text-outline-color": "data(color)",
            "box-shadow": "0 4px 6px rgba(0,0,0,0.1)",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#cbd5e1",
            "curve-style": "bezier",
            opacity: 0.6,
          },
        },
      ],
      layout: {
        name: "cose",
        padding: 30,
        animate: true,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 4000,
        edgeElasticity: 100,
        nestingFactor: 5,
      },
    });
  }, [graphData, assignments, gateColors]);

  return (
    <div className="relative w-full h-[500px] border bg-slate-50 rounded-xl overflow-hidden shadow-inner">
      <div ref={cyRef} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-[10px] border shadow-sm">
        Nodes colored by Gate Assignment
      </div>
    </div>
  );
};

export default ConflictGraph;
