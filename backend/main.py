# Uvicorn is a ASGI server = supports async code
# ASGI - async server gateway interface


# This code defines a FastAPI backend that analyzes a pipeline represented as a graph using the **networkx** library. 
# Here's a breakdown of what the code means:
"""
### **1. ASGI Server:**
- **Uvicorn** is an **ASGI server** (Asynchronous Server Gateway Interface), which allows handling asynchronous (async) code. FastAPI uses **ASGI** to enable faster processing of requests through asynchronous functionality.
"""
"""
### **2. FastAPI Setup:**
- **FastAPI** is used to create the web application. 
- It automatically generates API documentation and handles request validation using **Pydantic**.
"""

from fastapi import FastAPI
from pydantic import BaseModel
import networkx as nx

app = FastAPI()

"""
### **3. The `Pipeline` Model:**
- **Pipeline** is a Pydantic model used to validate the data received in the request.
  - `nodes`: A list of node names (strings).
  - `edges`: A list of tuples where each tuple contains two strings representing a directed edge (from node A to node B).
"""
class Pipeline(BaseModel):
    nodes: list[str]
    edges: list[tuple[str, str]]

"""
### **4. Endpoint `/analyze_pipeline/`:**
- **POST method** at `/analyze_pipeline/` endpoint receives the pipeline data (nodes and edges) and processes it asynchronously (indicated by `async def`).
"""

@app.post("/analyze_pipeline/")
async def analyze_pipeline(pipeline: Pipeline):
    # ### **5. Graph Creation:**
    # - A directed graph (`DiGraph`) is created using **networkx**. This is an in-memory graph data structure.
    # - **`graph.add_nodes_from(pipeline.nodes)`**: Adds all the nodes to the graph.
    # - **`graph.add_edges_from(pipeline.edges)`**: Adds all the edges to the graph.
    graph = nx.DiGraph()
    graph.add_nodes_from(pipeline.nodes)
    graph.add_edges_from(pipeline.edges)

    # ### **6. Graph Analysis:**
    # - **Number of Nodes**: The code calculates the total number of nodes using `graph.number_of_nodes()`.
    # - **Number of Edges**: The total number of edges is calculated using `graph.number_of_edges()`.
    # - **DAG Check**: The function `nx.is_directed_acyclic_graph(graph)` checks if the graph is a
    # Directed Acyclic Graph (DAG). A **DAG** is a directed graph with no cycles (loops).
    num_nodes = graph.number_of_nodes()
    num_edges = graph.number_of_edges()
    is_dag = nx.is_directed_acyclic_graph(graph)

    # ### **7. Return Result:**
    # - The response is a JSON object containing:
    # - `"num_nodes"`: The number of nodes in the graph.
    # - `"num_edges"`: The number of edges in the graph.
    # - `"is_dag"`: A boolean indicating whether the graph is a **DAG**.

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

"""
### **Example Request and Response:**
**Request Example:**
```json
{
  "nodes": ["A", "B", "C"],
  "edges": [("A", "B"), ("B", "C")]
}
```

**Response Example:**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```
---
In summary, this FastAPI application takes in a graph (pipeline), processes it to count the nodes and edges, and checks if it's a valid Directed Acyclic Graph (DAG). It then returns the results as a JSON response.
"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)