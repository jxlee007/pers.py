// This code represents a React application that visualizes a directed graph (or pipeline) using React Flow. 
// The graph consists of nodes (blocks) that users can dynamically add, connect, and interact with. 
// The application also communicates with a FastAPI backend to analyze the pipeline, 
// checking properties like the number of nodes, edges, and whether the pipeline forms a Directed Acyclic Graph (DAG).
// ------------------------------------------------------------------------------------------------------------------

// digraph = pippeline
/*
ReactFlow is a component from react-flow-renderer that provides an interactive canvas for visualizing nodes and edges.
addEdge is a utility function used to add a new edge (connection between two nodes).
Background is used to add a grid background to the canvas.
*/
import React, { useState } from "react";
// Libraries: react-flow-renderer (for visualizing nodes), axios (for API calls).
import ReactFlow, { addEdge, Background } from "react-flow-renderer";
import axios from "axios";


/*
initialNodes: Defines the starting nodes on the canvas. 
Each node has: An id (unique identifier for the node).
data: Contains any data associated with the node, such as the label (the text shown in the node).
position: The (x, y) coordinates of where the node is placed on the canvas.
initialEdges: Starts as an empty array, meaning there are no connections (edges) between nodes at the beginning.
*/
const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
];

const initialEdges = [];

const App = () => {
  // nodes: Holds the state of all nodes on the canvas.
  // edges: Holds the state of all edges (connections) between nodes.
  // useState is a React hook used to manage state in functional components.
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // onConnect: This function is triggered when the user connects two nodes (an edge is added). 
  // It takes a connection object, which contains information about the source and target nodes.
  // The function updates the edges state using addEdge, which adds the new connection to the existing edges.
  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

  // analyzePipeline: This function sends a POST request to the FastAPI backend to analyze the pipeline.
  const analyzePipeline = async () => {
  /*
  Purpose: This function sends the node and edge data to the backend (a FastAPI server running on http://127.0.0.1:8000).
  Data Preparation:
  nodeIds: Maps the nodes to an array of their id values.
  edgePairs: Maps the edges to an array of pairs representing the source and target nodes.
  API Request: It makes a POST request to the backend's /analyze_pipeline/ endpoint, sending the nodes and edges data.
  */  
    const nodeIds = nodes.map((node) => node.id);
    const edgePairs = edges.map((edge) => [edge.source, edge.target]);

    // Response Handling: Upon a successful response:
    // Extracts the num_nodes, num_edges, and is_dag values from the response.
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze_pipeline/", {
        nodes: nodeIds,
        edges: edgePairs,
      });

      // Shows an alert with the number of nodes, edges, and whether the pipeline is a valid Directed Acyclic Graph (DAG).
      const { num_nodes, num_edges, is_dag } = response.data;
      alert(
        `Nodes: ${num_nodes}, Edges: ${num_edges}, Is DAG: ${is_dag ? "Yes" : "No"}`
      );
      
    //  Error Handling: If an error occurs during the API call, it logs the error to the console.
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