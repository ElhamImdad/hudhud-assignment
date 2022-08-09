import React, { useState } from "react";
import {
  Canvas,
  Node,
  useSelection,
  getEdgesByNode,
  removeNode,
  removeAndUpsertNodes,
} from "reaflow";
import "./App.css";

function App() {
  const _nodes = [
    {
      id: "1",
      text: "1",
      data: {
        isCollapse: true,
      },
    },
    {
      id: "2",
      text: "2",
    },
    {
      id: "98",
      text: "1-98",
    },
    {
      id: "96",
      text: "1-96",
    },
    {
      id: "8",
      text: "1-8",
    },
    {
      id: "22",
      text: "1-22",
    },
    {
      id: "37",
      text: "1-37",
    },
    {
      id: "18",
      text: "1-18",
    },
    {
      id: "20",
      text: "1-20",
    },
    {
      id: "19",
      text: "1-19",
    },
    {
      id: "90",
      text: "1-90",
    },
    {
      id: "38",
      text: "1-38",
    },
    {
      id: "77",
      text: "1-77",
    },
  ];
  const _edges = [
    {
      id: "1-2",
      from: "1",
      to: "2",
    },
    {
      id: "1-98",
      from: "1",
      to: "98",
    },
    {
      id: "1-96",
      from: "1",
      to: "96",
    },
    {
      id: "1-8",
      from: "1",
      to: "8",
    },
    {
      id: "1-22",
      from: "2",
      to: "22",
    },
    {
      id: "1-37",
      from: "2",
      to: "37",
    },
    {
      id: "1-18",
      from: "2",
      to: "18",
    },
    {
      id: "1-20",
      from: "2",
      to: "20",
    },
    {
      id: "1-90",
      from: "22",
      to: "90",
    },
    {
      id: "1-19",
      from: "8",
      to: "19",
    },
    {
      id: "1-38",
      from: "19",
      to: "38",
    },
    {
      id: "1-77",
      from: "38",
      to: "77",
    },
  ];

  const [edges, setEdges] = useState(_edges);

  const [nodes, setNodes] = useState(_nodes);

  const { selections, onCanvasClick, onClick } = useSelection({
    nodes,
    edges,
    onDataChange: (n, e) => {
      console.info("Data changed", n, e);
      setNodes(n);
      setEdges(e);
    },
    onClick: (n) => {
      console.log(n);
    },
  });
  
  const allNodesIds =[]
  const nodeBeenClicked = (node) => {
    try {
      let allNodesAfterTheClickedOne = getEdgesByNode(edges, node).from;
      allNodesAfterTheClickedOne.map((value) => {
        allNodesIds.push(value.to)
        nodeBeenClicked({id:value.to});
      });
      const results = removeNode(nodes, edges, allNodesIds);
      setNodes(results.nodes);
      setEdges(results.edges);
    } catch (e) {}
  };

  return (
    <div className="App">
      <Canvas
        pannable={true}
        nodes={nodes}
        edges={edges}
        selections={selections}
        node={(node) => {
          return (
            <Node
              onClick={(e, data) => {
                nodeBeenClicked(data);
              }}
            ></Node>
          );
        }}
      />
    </div>
  );
}

export default App;
