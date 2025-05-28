import React from 'react';

const CityGraphCustom = ({ graph }) => {
  const width = 600;
  const height = 400;
  const radius = 20;

 
  const nodeCount = graph.nodes.length;
  const centerX = width / 2;
  const centerY = height / 2;
  const circleRadius = Math.min(centerX, centerY) - 50;

  const nodePositions = {};
  graph.nodes.forEach((node, index) => {
    const angle = (2 * Math.PI * index) / nodeCount;
    const x = centerX + circleRadius * Math.cos(angle);
    const y = centerY + circleRadius * Math.sin(angle);
    nodePositions[node] = { x, y };
  });

  
  const edges = [];
  const seenEdges = new Set();
  for (const node in graph.adjList) {
    graph.adjList[node].forEach((neighbor) => {
      const edgeKey = [node, neighbor].sort().join('-');
      if (!seenEdges.has(edgeKey)) {
        edges.push([node, neighbor]);
        seenEdges.add(edgeKey);
      }
    });
  }

  return (
    <div>
      <h3>Red de Ciudades</h3>
      <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
        
        {edges.map(([source, target], idx) => {
          const sourcePos = nodePositions[source];
          const targetPos = nodePositions[target];
          if (!sourcePos || !targetPos) return null;
          return (
            <line
              key={idx}
              x1={sourcePos.x}
              y1={sourcePos.y}
              x2={targetPos.x}
              y2={targetPos.y}
              stroke="#999"
              strokeWidth="2"
            />
          );
        })}
        
        {graph.nodes.map((node) => {
          const pos = nodePositions[node];
          return (
            <g key={node}>
              <circle cx={pos.x} cy={pos.y} r={radius} fill="#00aaff" />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize="12"
                style={{ userSelect: 'none' }}
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CityGraphCustom;
