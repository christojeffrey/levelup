"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
let json: any = {
  nodes: [{ id: "d3" }, { id: "d3.svg" }, { id: "d3.svg.area" }, { id: "d3.svg.line" }, { id: "d3.scale" }, { id: "d3.scale.linear" }, { id: "d3.scale.ordinal" }],
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 0, target: 4 },
    { source: 4, target: 5 },
    { source: 4, target: 6 },
  ],
};

export default function SkillPath() {
  const ref = useRef(null);

  useEffect(() => {
    // append a circle
    // const size = 10;
    // let randomNodes: any = [];
    // // generate size nodes
    // for (let i = 0; i < size; i++) {
    //   randomNodes.push({ id: i });
    // }

    // let randomEdges = [];
    // // generate size edges
    // for (let i = 0; i < size * 10; i++) {
    //   randomEdges.push({
    //     source: Math.floor(Math.random() * size),
    //     target: Math.floor(Math.random() * size),
    //   });
    // }

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Let's list the force we wanna apply on the network
    const simulation = d3
      .forceSimulation(json.nodes) // Force algorithm is applied to data.nodes
      .force(
        "link",
        d3
          .forceLink() // This force provides links between nodes
          .id(function (d: any) {
            console.log("d", d);
            return d.index;
          }) // This provide  the id of a node
          .links(json.links) // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
      .on("tick", ticked);

    // Initialize the links
    const link = svg.selectAll("line").data(json.links).join("line").style("stroke", "#aaa");

    // Initialize the nodes
    const node = svg.selectAll("circle").data(json.nodes).join("circle").attr("r", 20).style("fill", "#69b3a2").call(drag(simulation));
    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
      //   var k = 6 * e.alpha;
      //   json.links.forEach(function (d, i) {
      //     d.source.y -= k;
      //     d.target.y += k;
      //   });
      link
        .attr("x1", function (d: any) {
          return d.source.x;
        })
        .attr("y1", function (d: any) {
          return d.source.y;
        })
        .attr("x2", function (d: any) {
          return d.target.x;
        })
        .attr("y2", function (d: any) {
          return d.target.y;
        });

      node
        .attr("cx", function (d: any) {
          return d.x + 6;
        })
        .attr("cy", function (d: any) {
          return d.y - 6;
        });
    }
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }
  }, []);

  return (
    <main className="">
      <h1>SkillPath</h1>
      {/* <Combobox /> */}
      <div id="graph" ref={ref}></div>
    </main>
  );
}
