import React from 'react';
import CPClienteItem from './CPClienteItem';

function CPListaClientes({ clientes, navigate }) {
  if (!Array.isArray(clientes)) {
    return <p>Nenhum cliente encontrado ou dados inválidos.</p>;
  }

  return (
    <ul>
      {clientes.map((cliente) => (
        <CPClienteItem key={cliente.idCliente} cliente={cliente} navigate={navigate} />
      ))}
    </ul>
  );
}

export default CPListaClientes;