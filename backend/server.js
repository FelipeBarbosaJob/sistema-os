const express = require('express');
const cors = require('cors');
const clientesRouter = require('./routes/clientesRoutes');

const app = express();
const port = process.env.PORT || 3000; // Usar variável de ambiente para a porta, se disponível

// Middleware
app.use(express.json()); // Para processar JSON no corpo das requisições
app.use(cors()); // Para permitir requisições de diferentes origens (CORS)

// Rotas
app.use('/clientes', clientesRouter);

// Rota de saúde (health check)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor está funcionando corretamente' });
});

// Middleware para tratar rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratar erros globais
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err.stack);

    // Retorna uma mensagem de erro mais específica com base no tipo de erro
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno no servidor';

    res.status(statusCode).json({ error: message });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});