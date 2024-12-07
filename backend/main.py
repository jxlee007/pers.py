from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import networkx as nx
import os
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the Pipeline model with validation
class Pipeline(BaseModel):
    nodes: list[str]
    edges: list[tuple[str, str]]

    def validate_graph(self):
        node_set = set(self.nodes)
        for edge in self.edges:
            if edge[0] not in node_set or edge[1] not in node_set:
                raise ValueError(f"Invalid edge {edge}: Node does not exist in 'nodes'")


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Pipeline Analyzer API"}

@app.post("/analyze_pipeline")
async def analyze_pipeline(pipeline: Pipeline):
    try:
        # Validate edges
        pipeline.validate_graph()

        # Create a directed graph
        graph = nx.DiGraph()
        graph.add_nodes_from(pipeline.nodes)
        graph.add_edges_from(pipeline.edges)

        # Analyze the graph
        num_nodes = graph.number_of_nodes()
        num_edges = graph.number_of_edges()
        is_dag = nx.is_directed_acyclic_graph(graph)

        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Custom exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "details": str(exc)},
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("RELOAD", "True") == "True",
    )
