import React from 'react';

const GreenZoneNode = ({ node, onInsert, onSelect }) => {
  if (!node) return null;

  const handleEdit = () => {
    const newName = prompt('Editar nombre de la zona:', node.valor);
    if (newName && newName.trim() !== '') {
      node.valor = newName.trim();
      onSelect(node);
    }
  };

  return (
    <div className="node-container" onClick={() => onSelect(node)} style={{ cursor: 'pointer' }}>
      <div className="node">
        {node.valor}
        <button onClick={(e) => { e.stopPropagation(); handleEdit(); }} style={{ marginLeft: '10px' }}>Editar</button>
        <div>
          <button onClick={(e) => { e.stopPropagation(); onInsert(node, 'izquierda'); }}>Left</button>
          <button onClick={(e) => { e.stopPropagation(); onInsert(node, 'derecha'); }}>Right</button>
        </div>
      </div>
      <div className="children">
        <GreenZoneNode node={node.izquierda} onInsert={onInsert} onSelect={onSelect} />
        <GreenZoneNode node={node.derecha} onInsert={onInsert} onSelect={onSelect} />
      </div>
    </div>
  );
}