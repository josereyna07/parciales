export const createGreenZone = (valor) => ({
  valor,
  izquierda: null,
  derecha: null,
});

export const insertZone = (node, direction, onInsert) => {
  const newZone = createGreenZone(prompt("Nombre de la subzona:"));
  if (direction === 'izquierda') {
    node.izquierda = newZone;
  } else {
    node.derecha = newZone;
  }
  onInsert();
};
