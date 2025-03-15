import React from 'react';

function CPClienteItem({ cliente, navigate }) {
  return (
    <li>
      <strong>Nome: </strong> {cliente.nomeCliente}<br />
      <strong>Código Sankhya: </strong> {cliente.codSankhya}<br />
      <button onClick={() => navigate(`/clientes/detalhes/${cliente.idCliente}`)}>Ver Detalhes</button>
    </li>
  );
}

export default CPClienteItem;