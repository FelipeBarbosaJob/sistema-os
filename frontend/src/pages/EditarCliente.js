import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CPEditarCliente from '../components/cliente/CPEditarCliente';

function EditarCliente() {
  const { idCliente } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const response = await fetch(`http://localhost:3000/clientes/${idCliente}`);
        if (!response.ok) {
          const errorData = await response.json(); // Captura a mensagem de erro do backend
          throw new Error(errorData.error || 'Erro ao carregar cliente');
        }
        const data = await response.json();
        console.log('Dados recebidos do backend:', data); // Log dos dados recebidos
        setCliente(data);
      } catch (error) {
        console.error('Erro ao carregar cliente:', error); // Log do erro
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarCliente();
  }, [idCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/clientes/${idCliente}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Captura a mensagem de erro do backend
        throw new Error(errorData.error || 'Erro ao atualizar cliente');
      }
      alert('Cliente atualizado com sucesso!');
      navigate(`/clientes/detalhes/${idCliente}`); // Redireciona para a página de detalhes
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error); // Log do erro
      alert(error.message);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!cliente) return <div>Cliente não encontrado.</div>;

  return (
    <div>
      <h1>Editar Cliente</h1>
      <CPEditarCliente cliente={cliente} setCliente={setCliente} handleSubmit={handleSubmit} />
    </div>
  );
}

export default EditarCliente;