import React, { useState } from 'react';
import { Graph } from './graph/graph';
import CityZones from './components/CityZones';
import CityGraphCustom from './components/CityGraphCustom';

const App = () => {
  const [graph] = useState(new Graph());
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInput, setCityInput] = useState('');

  const addCity = () => {
    if (!cityInput || cityInput.trim().length === 0) {
      alert("El nombre de la ciudad no puede estar vacío o contener solo espacios.");
      return;
    }
    if (!/[a-zA-Z]/.test(cityInput)) {
      alert("El nombre de la ciudad debe contener al menos una letra.");
      return;
    }
    if (graph.searchNode(cityInput)) return;
    graph.addNode(cityInput.trim());
    setCities([...cities, cityInput.trim()]);
    setSelectedCity(cityInput.trim());
    setCityInput('');
  };

  const deleteCity = (city) => {
    graph.removeNode(city);
    setCities(cities.filter(c => c !== city));
    if (selectedCity === city) {
      setSelectedCity(null);
    }
  };

  const connectCities = () => {
    const city1 = prompt('Ciudad 1:');
    const city2 = prompt('Ciudad 2:');
    graph.addEdge(city1, city2);
    alert(`Conectadas ${city1} y ${city2}`);
    setCities([...cities]);
  };

  return (
    <div className="app">
      <h1>Red de Ciudades</h1>
      <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} placeholder="Nombre de ciudad" />
      <button onClick={addCity}>Agregar Ciudad</button>
      <button onClick={connectCities}>Conectar Ciudades</button>
      <hr />
      <CityGraphCustom graph={graph} />
      <hr />
      <ul>
        {cities.map((city) => (
          <li key={city}>
            <button onClick={() => setSelectedCity(city)}>{city}</button>
            <button onClick={() => deleteCity(city)} style={{ marginLeft: '10px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedCity && <CityZones city={selectedCity} />}
    </div>
  );
};

export default App;
