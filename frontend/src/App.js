import React from 'react';
import './Style/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import CadastroClientes from './pages/CadastroClientes';
import DetalhesClientes from './pages/DetalhesClientes';
import EditarCliente from './pages/EditarCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/cadastro" element={<CadastroClientes />} />
        <Route path="/clientes/detalhes/:idCliente" element={<DetalhesClientes />} />
        <Route path="/clientes/detalhes/editar/:idCliente" element={<EditarCliente />} /> {/* Rota de edição simplificada */}
      </Routes>
    </Router>
  );
}

export default App;