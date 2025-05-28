import React, { useState } from 'react';
import Tree from 'react-d3-tree';


const convertToD3Tree = (node) => {
  if (!node) return null;
  const children = [];
  if (node.izquierda) children.push(convertToD3Tree(node.izquierda));
  if (node.derecha) children.push(convertToD3Tree(node.derecha));
  return {
    name: node.valor,
    children: children.length > 0 ? children : undefined,
  };
};

const D3TreeView = ({ root, onSelectNode }) => {
  const [selectedNodeName, setSelectedNodeName] = useState(null);
  const data = convertToD3Tree(root);



  const handleNodeClick = (nodeData) => {
    console.log('Node clicked data:', nodeData);
    const nodeName = nodeData.name || nodeData.data?.name || nodeData.attributes?.name;
    setSelectedNodeName(nodeName);
    if (onSelectNode) {
      onSelectNode(nodeName);
    }
  };

  const nodeSvgShape = {
    shape: 'circle',
    shapeProps: {
      r: 15,
      fill: '#00aaff',
      stroke: selectedNodeName ? 'red' : '#000',
      strokeWidth: 3,
    },
  };

  return (
    <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
      <Tree
        data={data}
        orientation="vertical"
        onNodeClick={handleNodeClick}
      />
      {selectedNodeName && <p>Zona seleccionada: {selectedNodeName}</p>}
    </div>
  );
};

export default D3TreeView;
