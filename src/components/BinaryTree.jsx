import React, { useState } from 'react';
import TreeNode from '../tree/TreeNode.js';

const BinaryTree = ({ initialRoot }) => {
  const [tree, setTree] = useState(initialRoot);

  const insertNode = (current, side) => {
    if (!current[side]) {
      current[side] = {
        valor: prompt('Nombre de la subzona:'),
        izquierda: null,
        derecha: null,
      };
      setTree({ ...tree });
    }
  };

  return (
    <div className="tree">
      <TreeNode node={tree} onInsert={insertNode} />
    </div>
  );
};

export default BinaryTree;
