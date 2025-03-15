import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Seleciona o elemento raiz
const rootElement = document.getElementById('root');

// Verifica se o elemento raiz existe
if (!rootElement) {
  throw new Error("Elemento com id 'root' não encontrado no DOM.");
}

// Cria a raiz e renderiza o aplicativo
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);