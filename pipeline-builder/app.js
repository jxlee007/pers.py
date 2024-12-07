import React, { useState } from "react";
// Libraries: react-flow-renderer (for visualizing nodes), axios (for API calls).
import ReactFlow, { addEdge, Background } from "react-flow-renderer";
import axios from "axios";

const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
];

const initialEdges = [];

const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

  const analyzePipeline = async () => {
    const nodeIds = nodes.map((node) => node.id);
    const edgePairs = edges.map((edge) => [edge.source, edge.target]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze_pipeline/", {
        nodes: nodeIds,
        edges: edgePairs,
      });

      const { num_nodes, num_edges, is_dag } = response.data;
      alert(
        `Nodes: ${num_nodes}, Edges: ${num_edges}, Is DAG: ${is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      console.error("Error analyzing pipeline:", error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <button onClick={analyzePipeline} style={{ position: "absolute", top: 10, left: 10 }}>
        Submit Pipeline
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default App;
