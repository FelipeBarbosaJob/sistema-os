import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListaClientes from '../components/cliente/CPListaClientes';

function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega os clientes ao montar o componente
  useEffect(() => {
    carregarClientes();
  }, []);

  // Função para carregar os clientes
  const carregarClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      if (!response.ok) throw new Error('Erro ao carregar clientes');
      const data = await response.json();
      console.log('Dados recebidos do backend:', data); // Log dos dados recebidos
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error); // Log do erro
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtra os clientes com base no termo de busca
  const clientesFiltrados = clientes.filter((cliente) => {
    const nomeValido = cliente.nomeCliente && cliente.nomeCliente.toLowerCase().includes(termoBusca.toLowerCase());
    const numeroValido = cliente.codSankhya && cliente.codSankhya.toString().includes(termoBusca.toLowerCase());
    return nomeValido || numeroValido;
  });

  return (
    <div>
      <h1>Clientes Cadastrados</h1>

      <input
        type="text"
        placeholder="Buscar por nome ou código Sankhya"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      <button onClick={() => navigate('/clientes/cadastro')}>Cadastrar Novo Cliente</button>

      <button onClick={() => navigate('/')}>Voltar para Home</button>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && Array.isArray(clientesFiltrados) && clientesFiltrados.length > 0 ? (
        <ListaClientes clientes={clientesFiltrados} navigate={navigate} />
      ) : (
        !loading && <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
}

export default Clientes;