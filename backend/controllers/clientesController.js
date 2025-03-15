const Cliente = require('../models/clienteModels');
const db = require('../database');

const clientesController = {
    criar: (req, res) => {
        const { nomeCliente, codSankhya, telefone, endereco, cep, veiculo } = req.body;

        console.log('Dados recebidos:', { nomeCliente, codSankhya, telefone, endereco, cep, veiculo });

        // Verificando se todos os campos obrigatórios foram preenchidos
        if (!nomeCliente || !codSankhya || !telefone || !endereco || !cep || !veiculo) {
            console.error('Campos obrigatórios faltando');
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Verifica se o codSankhya já existe
        const query = 'SELECT * FROM cliente WHERE codSankhya = ?';
        db.get(query, [codSankhya], (err, row) => {
            if (err) {
                console.error('Erro ao verificar codSankhya:', err.message);
                return res.status(500).json({ error: 'Erro ao verificar codSankhya' });
            }

            if (row) {
                console.error('codSankhya já está em uso:', codSankhya);
                return res.status(400).json({ error: 'codSankhya já está em uso' });
            }

            // Insere o novo cliente
            const insertQuery = `
                INSERT INTO cliente (nomeCliente, codSankhya, telefone, endereco, cep, veiculo)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.run(insertQuery, [nomeCliente, codSankhya, telefone, endereco, cep, veiculo], function (err) {
                if (err) {
                    console.error('Erro ao salvar cliente:', err.message);
                    return res.status(500).json({ error: 'Erro ao salvar cliente' });
                }
                console.log('Cliente cadastrado com sucesso:', this.lastID);
                res.json({ message: 'Cliente cadastrado com sucesso!' });
            });
        });
    },

    listarTodos: (req, res) => {
        Cliente.buscarTodos((err, rows) => {
            if (err) {
                console.error('Erro ao buscar clientes:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    },

    buscarPorId: (req, res) => {
        const { idCliente } = req.params;
        Cliente.buscarPorId(idCliente, (err, row) => {
            if (err) {
                console.error('Erro ao buscar cliente:', err.message);
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            res.json(row);
        });
    },

    atualizar: (req, res) => {
        const { idCliente } = req.params;
        const { nomeCliente, codSankhya, telefone, endereco, cep, veiculo } = req.body;

        // Verificando se todos os campos obrigatórios foram preenchidos
        if (!nomeCliente || !codSankhya || !telefone || !endereco || !cep || !veiculo) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Verifica se o cliente existe antes de atualizar
        Cliente.buscarPorId(idCliente, (err, row) => {
            if (err) {
                console.error('Erro ao buscar cliente:', err.message);
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            // Chama o método de atualizar do modelo Cliente para modificar no banco de dados
            Cliente.atualizar(idCliente, { nomeCliente, codSankhya, telefone, endereco, cep, veiculo }, function (err) {
                if (err) {
                    console.error('Erro ao atualizar cliente:', err.message);
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Cliente atualizado com sucesso' });
            });
        });
    },

    deletar: (req, res) => {
        const { idCliente } = req.params;
        Cliente.deletar(idCliente, function (err) {
            if (err) {
                console.error('Erro ao deletar cliente:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cliente deletado com sucesso' });
        });
    }
};

module.exports = clientesController;