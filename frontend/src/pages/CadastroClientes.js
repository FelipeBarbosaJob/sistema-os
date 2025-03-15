import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CPBuscaCep from '../components/cliente/CPBuscaCep'; // Importe o componente CPBuscaCep

function CadastroClientes() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nomeCliente: '',
    codSankhya: '',
    telefone: '',
    endereco: '',
    cep: '',
    veiculo: '',
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  // Função para atualizar o endereço no estado do cliente
  const handleEnderecoChange = (endereco) => {
    setCliente({ ...cliente, endereco });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar cliente');
      }

      alert('Cliente criado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      console.error('Erro:', error.message);
      alert(`Erro ao criar cliente: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeCliente"
          value={cliente.nomeCliente}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="codSankhya"
          value={cliente.codSankhya}
          onChange={handleChange}
          placeholder="Código Sankhya"
          required
        />
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          required
        />
        {/* Componente CPBuscaCep */}
        <CPBuscaCep onEnderecoChange={handleEnderecoChange} />
        <input
          type="text"
          name="endereco"
          value={cliente.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          required
        />
        <input
          type="text"
          name="cep"
          value={cliente.cep}
          onChange={handleChange}
          placeholder="CEP"
          required
        />
        <input
          type="text"
          name="veiculo"
          value={cliente.veiculo}
          onChange={handleChange}
          placeholder="Modelo do Veículo"
          required
        />
        <button type="submit">Salvar</button>
      </form>
      <button onClick={() => navigate('/clientes')}>Cancelar</button>
    </div>
  );
}

export default CadastroClientes;