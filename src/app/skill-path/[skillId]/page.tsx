import Graph from "@/app/_components/graph";

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
  return (
    <div className="h-screen">
      <Graph json={json} />
    </div>
  );
}
