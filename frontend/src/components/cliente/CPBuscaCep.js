import React, { useState, useEffect } from 'react';

function CPBuscaCep({ onEnderecoChange }) {
  const [cep, setCep] = useState('');

  useEffect(() => {
    // Dispara a consulta automática quando o CEP tiver 8 dígitos
    if (cep.length === 8) {
      buscarCep();
    }
  }, [cep]); // Executa o efeito sempre que o CEP mudar

  const buscarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }

      // Passa apenas o endereço para o componente pai
      onEnderecoChange(data.logradouro);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Tente novamente.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cep}
        onChange={(e) => {
          const novoCep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
          setCep(novoCep); // Atualiza o estado do CEP
        }}
        placeholder="Digite o CEP"
        maxLength={8}
      />
    </div>
  );
}

export default CPBuscaCep;