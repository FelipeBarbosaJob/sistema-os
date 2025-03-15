import React from 'react';

function CPEditarCliente({ cliente, setCliente, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeCliente"
          value={cliente.nomeCliente || ''}
          onChange={(e) => setCliente({ ...cliente, nomeCliente: e.target.value })}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="codSankhya"
          value={cliente.codSankhya || ''}
          onChange={(e) => setCliente({ ...cliente, codSankhya: e.target.value })}
          placeholder="Código Sankhya"
          required
        />
        <input
          type="text"
          name="telefone"
          value={cliente.telefone || ''}
          onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
          placeholder="Telefone"
          required
        />
        <input
          type="text"
          name="endereco"
          value={cliente.endereco || ''}
          onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
          placeholder="Endereço"
          required
        />
        <input
          type="text"
          name="cep"
          value={cliente.cep || ''}
          onChange={(e) => setCliente({ ...cliente, cep: e.target.value })}
          placeholder="CEP"
          required
        />
        <input
          type="text"
          name="veiculo"
          value={cliente.veiculo || ''}
          onChange={(e) => setCliente({ ...cliente, veiculo: e.target.value })}
          placeholder="Veículo"
          required
        />
        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate(`/clientes/detalhes/${cliente.idCliente}`)}>Cancelar</button>
    </div>
  );
}

export default CPEditarCliente;