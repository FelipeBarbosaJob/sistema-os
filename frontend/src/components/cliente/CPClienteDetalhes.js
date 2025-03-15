import React from 'react';

function CPClienteDetalhes({ cliente }) {
  return (
    <div>
      <h2>{cliente.nomeCliente}</h2>
      <p>Nome: {cliente.nomeCliente}</p>
      <p>Código Sankhya: {cliente.codSankhya}</p>
      <p>Telefone: {cliente.telefone}</p>
      <p>Endereço: {cliente.endereco}</p>
      <p>CEP: {cliente.cep}</p>
      <p>Veículo: {cliente.veiculo}</p>
    </div>
  );
}

export default CPClienteDetalhes;