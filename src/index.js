import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

function App() {
  const graph = {
    nodes: [
      { id: 1, label: "Procedure", color: "#cb8782", shape: "box" },
      { id: 2, label: "Patient", color: "#f0c69d", shape: "box" },
      { id: 3, label: "Condition", color: "#f4dd9b", shape: "box" },
      { id: 4, label: "Observation", color: "#9cc49a", shape: "box" },
      { id: 5, label: "Encounter", color: "#9ab0c4", shape: "box" }
    ],
    edges: [
      {
        from: 1,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true
        },
        color: "#Be3a25"
      },
      {
        from: 3,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true
        },
        color: "#EAC215"
      },
      {
        from: 4,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true
        },
        color: "#5e765c"
      },
      {
        from: 5,
        to: 2,
        label: "Subject",
        smooth: {
          enabled: true
        },
        color: "#254460"
      },
      {
        from: 3,
        to: 5,
        label: "Subject",
        smooth: {
          enabled: true
        },
        color: "#EAC215"
      }
    ]
  };

  const options = {
    nodes: {
      chosen: {
        borderColor: "EAC215"
      }
    },
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "700px",
    physics: {
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0
      },
      forceAtlas2Based: {
        theta: 0.5,
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09,
        avoidOverlap: 0
      },
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: "barnesHut",
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      },
      timestep: 0.5,
      adaptiveTimestep: true,
      wind: { x: 0, y: 0 }
    }
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    }
  };

  useEffect(() => {
    fetch("https://hapi.fhir.org/baseR4/Patient/1698462", {})
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        console.log(jsonData.birthDate);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });

    console.log("====test=====");
  }, []);
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
