const db = require('../database');

class ClienteModels {
    // Método para criar um novo cliente
    static criar({ nomeCliente, codSankhya, telefone, endereco, cep, veiculo }, callback) {
        // Validação básica dos campos
        if (!nomeCliente || !codSankhya || !telefone || !endereco || !cep || !veiculo) {
            return callback(new Error('Todos os campos são obrigatórios'));
        }

        // Verifica se o codSankhya já existe
        const checkQuery = 'SELECT * FROM cliente WHERE codSankhya = ?';
        db.get(checkQuery, [codSankhya], (err, row) => {
            if (err) {
                return callback(err);
            }

            if (row) {
                return callback(new Error('codSankhya já está em uso'));
            }

            // Insere o novo cliente
            const insertQuery = `
                INSERT INTO cliente (nomeCliente, codSankhya, telefone, endereco, cep, veiculo)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.run(insertQuery, [nomeCliente, codSankhya, telefone, endereco, cep, veiculo], callback);
        });
    }

    // Método para buscar todos os clientes
    static buscarTodos(callback) {
        const query = 'SELECT * FROM cliente';
        db.all(query, [], callback);
    }

    // Método para buscar um cliente pelo ID
    static buscarPorId(idCliente, callback) {
        const query = 'SELECT * FROM cliente WHERE idCliente = ?';
        db.get(query, [idCliente], callback);
    }

    // Método para atualizar as informações de um cliente
    static atualizar(idCliente, { nomeCliente, codSankhya, telefone, endereco, cep, veiculo }, callback) {
        // Validação básica dos campos
        if (!nomeCliente || !codSankhya || !telefone || !endereco || !cep || !veiculo) {
            return callback(new Error('Todos os campos são obrigatórios'));
        }

        // Verifica se o cliente existe antes de atualizar
        const checkQuery = 'SELECT * FROM cliente WHERE idCliente = ?';
        db.get(checkQuery, [idCliente], (err, row) => {
            if (err) {
                return callback(err);
            }

            if (!row) {
                return callback(new Error('Cliente não encontrado'));
            }

            // Atualiza o cliente
            const updateQuery = `
                UPDATE cliente
                SET nomeCliente = ?, codSankhya = ?, telefone = ?, endereco = ?, cep = ?, veiculo = ?
                WHERE idCliente = ?
            `;
            db.run(updateQuery, [nomeCliente, codSankhya, telefone, endereco, cep, veiculo, idCliente], callback);
        });
    }

    // Método para deletar um cliente pelo ID
    static deletar(idCliente, callback) {
        // Verifica se o cliente existe antes de deletar
        const checkQuery = 'SELECT * FROM cliente WHERE idCliente = ?';
        db.get(checkQuery, [idCliente], (err, row) => {
            if (err) {
                return callback(err);
            }

            if (!row) {
                return callback(new Error('Cliente não encontrado'));
            }

            // Deleta o cliente
            const deleteQuery = 'DELETE FROM cliente WHERE idCliente = ?';
            db.run(deleteQuery, [idCliente], callback);
        });
    }
}

module.exports = ClienteModels;