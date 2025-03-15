import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClienteDetalhes from '../components/cliente/CPClienteDetalhes';

function DetalhesClientes() {
  const { idCliente } = useParams(); // Alterado para idCliente
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega os dados do cliente
  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const response = await fetch(`http://localhost:3000/clientes/${idCliente}`); // Usando idCliente
        if (!response.ok) {
          const errorData = await response.json(); // Captura a mensagem de erro do backend
          throw new Error(errorData.error || 'Erro ao carregar cliente');
        }
        const data = await response.json();
        console.log('Dados recebidos do backend:', data); // Log dos dados recebidos
        if (!data) {
          setError('Cliente não encontrado.');
        } else {
          setCliente(data);
        }
      } catch (error) {
        console.error('Erro ao carregar cliente:', error); // Log do erro
        setError('Erro ao carregar dados do cliente');
      } finally {
        setLoading(false);
      }
    };

    carregarCliente();
  }, [idCliente]); // Dependência atualizada para idCliente

  // Função para deletar o cliente
  const handleDelete = async () => {
    const confirmacao = window.confirm('Tem certeza que deseja apagar este cliente?');
    if (confirmacao) {
      try {
        const response = await fetch(`http://localhost:3000/clientes/${idCliente}`, { // Usando idCliente
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar cliente');
        alert('Cliente apagado com sucesso!');
        navigate('/clientes'); // Redireciona para a lista de clientes
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao apagar cliente');
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!cliente) return <div>Cliente não encontrado.</div>;

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <ClienteDetalhes cliente={cliente} />
      <button onClick={() => navigate(`/clientes/detalhes/editar/${idCliente}`)}>Editar Cliente</button> {/* Usando idCliente */}
      <button 
        onClick={handleDelete} 
        style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
      >
        Apagar Cliente
      </button>
      <button onClick={() => navigate('/clientes')} style={{ marginLeft: '10px' }}>
        Voltar para Lista
      </button>
    </div>
  );
}

export default DetalhesClientes;