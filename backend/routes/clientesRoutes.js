const express = require('express');
const clientesController = require('../controllers/clientesController');
const { body, param, validationResult } = require('express-validator'); // Corrigido para express-validator

const router = express.Router();

// Middleware para tratar erros de validação
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

// Rota para criar um cliente
router.post(
    '/',
    validate([
        // Validação dos campos usando express-validator
        body('nomeCliente').notEmpty().withMessage('Nome do cliente é obrigatório'),
        body('codSankhya').notEmpty().isNumeric().withMessage('Código Sankhya é obrigatório e deve ser um número'),
        body('telefone').notEmpty().isNumeric().withMessage('Telefone é obrigatório e deve ser um número'),
        body('endereco').notEmpty().withMessage('Endereço é obrigatório'),
        body('cep').notEmpty().isNumeric().withMessage('CEP é obrigatório e deve ser um número'),
        body('veiculo').notEmpty().withMessage('Veículo é obrigatório'),
    ]),
    clientesController.criar
);

// Rota para listar todos os clientes
router.get('/', clientesController.listarTodos);

// Rota para buscar um cliente pelo ID
router.get(
    '/:idCliente',
    validate([
        // Validação do ID do cliente
        param('idCliente').isInt().withMessage('ID do cliente deve ser um número inteiro'),
    ]),
    clientesController.buscarPorId
);

// Rota para atualizar um cliente pelo ID
router.put(
    '/:idCliente',
    validate([
        // Validação do ID do cliente
        param('idCliente').isInt().withMessage('ID do cliente deve ser um número inteiro'),
        // Validação dos campos
        body('nomeCliente').notEmpty().withMessage('Nome do cliente é obrigatório'),
        body('codSankhya').notEmpty().isNumeric().withMessage('Código Sankhya é obrigatório e deve ser um número'),
        body('telefone').notEmpty().isNumeric().withMessage('Telefone é obrigatório e deve ser um número'),
        body('endereco').notEmpty().withMessage('Endereço é obrigatório'),
        body('cep').notEmpty().isNumeric().withMessage('CEP é obrigatório e deve ser um número'),
        body('veiculo').notEmpty().withMessage('Veículo é obrigatório'),
    ]),
    clientesController.atualizar
);

// Rota para deletar um cliente pelo ID
router.delete(
    '/:idCliente',
    validate([
        // Validação do ID do cliente
        param('idCliente').isInt().withMessage('ID do cliente deve ser um número inteiro'),
    ]),
    clientesController.deletar
);

module.exports = router;