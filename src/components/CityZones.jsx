import React, { useState } from 'react';
import D3TreeView from './D3TreeView';
import { createGreenZone } from '../tree/TreeNode';

const getHeight = (node) => {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.izquierda), getHeight(node.derecha));
};

const countZones = (node) => {
  if (!node) return 0;
  return 1 + countZones(node.izquierda) + countZones(node.derecha);
};

const CityZones = ({ city }) => {
  const [zones, setZones] = useState(createGreenZone("Zona Principal"));
  const [selectedNodeName, setSelectedNodeName] = useState(null);

  const findNodeByName = (node, name) => {
    if (!node) return null;
    if (node.valor === name) return node;
    return findNodeByName(node.izquierda, name) || findNodeByName(node.derecha, name);
  };

  const handleInsert = (direction) => {
    if (!selectedNodeName) {
      alert('Por favor seleccione una zona para agregar una subzona.');
      return;
    }
    const parent = findNodeByName(zones, selectedNodeName);
    if (!parent) {
      alert('Zona seleccionada no encontrada.');
      return;
    }
    if (parent[direction]) {
      alert(`La subzona ${direction} ya existe.`);
      return;
    }
    const inputName = prompt("Nombre de la subzona:");
    if (!inputName || inputName.trim().length === 0) {
      alert("El nombre de la subzona no puede estar vacío o contener solo espacios.");
      return;
    }
    if (!/[a-zA-Z]/.test(inputName)) {
      alert("El nombre de la subzona debe contener al menos una letra.");
      return;
    }
    const newZone = createGreenZone(inputName.trim());
    parent[direction] = newZone;
    setZones({ ...zones });
  };

  const handleEditNode = () => {
    if (!selectedNodeName) {
      alert('Por favor seleccione una zona para editar.');
      return;
    }
    const node = findNodeByName(zones, selectedNodeName);
    if (!node) {
      alert('Zona seleccionada no encontrada.');
      return;
    }
    const newName = prompt('Editar nombre de la zona:', node.valor);
    if (newName && newName.trim() !== '') {
      node.valor = newName.trim();
      setZones({ ...zones });
    }
  };


  return (
    <div className="city-zones">
      <h3>{city}</h3>
      <D3TreeView root={zones} onSelectNode={setSelectedNodeName} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => handleInsert('izquierda')}>Agregar subzona izquierda</button>
        <button onClick={() => handleInsert('derecha')} style={{ marginLeft: '10px' }}>Agregar subzona derecha</button>
        <button onClick={handleEditNode} style={{ marginLeft: '10px' }}>Editar nodo</button>
      </div>
      <p>Total de zonas: {countZones(zones)}</p>
      <p>Altura del árbol: {getHeight(zones)}</p>
      {selectedNodeName && <p style={{ fontWeight: 'bold', color: '#1890ff' }}>Zona seleccionada: {selectedNodeName}</p>}
    </div>
  );
};

export default CityZones;
