import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo ao Sistema</h1>
      <button onClick={() => navigate('/clientes')}>Ver Clientes</button>
      <button onClick={() => navigate('/orcamentos')}>Ver Orçamentos</button>
    </div>
  );
}

export default Home;
