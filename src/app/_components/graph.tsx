"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
export default function Graph({ json }) {
  const ref = useRef(null);
  useEffect(() => {
    const doneList = localStorage.getItem("done-list") || [];
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    // set the dimensions and margins of the graph
    // append the svg object to the body of the page
    const svg = d3.select(ref.current).append("svg").attr("width", width).attr("height", height).append("g");
    // Let's list the force we wanna apply on the network

    // Initialize the links
    let links = svg.selectAll("line").data(json.links);
    let nodes = svg.selectAll("g").data(json.nodes);
    let simulation;

    function update(simulation) {
      const enterLink = links
        .data(json.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      // add gif /fire.gif
      const enterNodeContainer = nodes
        .data(json.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      // add circle
      enterNodeContainer
        .append("circle")
        .attr("r", 40)
        .style("fill", (d: any) => {
          // if inside done list, make it green
          if (doneList.includes(d.id)) {
            return "green";
          }
          return "white";
        })
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .on("click", (e, d: any) => {
          // console.log(d);
          window.location.href = d.link;
        });
      //   add image if it has source

      enterNodeContainer
        .append("image")
        .attr("xlink:href", (d: any) => {
          if (d.source) {
            return d.source;
          }
          // return "";
        })
        .attr("x", -20)
        .attr("y", -20)
        .attr("width", 40)
        .attr("height", 40);

      nodes = nodes.merge(enterNodeContainer);
      links = links.merge(enterLink);
      //   clear the simulations, apply the new one
      simulation?.stop();

      simulation = d3
        .forceSimulation(json.nodes)
        .force(
          "link",
          d3
            .forceLink() // This force provides links between nodes
            .id(function (d: any) {
              return d.index;
            }) // This provide  the id of a node
            .links(json.links) // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-800)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
        .on("tick", () => {
          ticked(simulation.alpha(), json.links, links, nodes);
        });
      simulation.restart();
    }

    update(simulation);
  }, []);

  return <div id="graph" ref={ref} className="h-full w-full"></div>;
}
function ticked(alpha, links, link, node) {
  var k = 50 * alpha;
  links.forEach(function (d, i) {
    d.source.y -= k;
    d.target.y += k;
  });
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
  node.attr("transform", function (d: any) {
    return "translate(" + d.x + "," + d.y + ")";
  });
}
