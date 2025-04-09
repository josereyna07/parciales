import React from 'react';
import AddClient from './AddCliente';
import ClientList from './ClienteList';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Centro de Atención</h1>
      <AddClient />
      <ClientList />
    </div>
  );
}