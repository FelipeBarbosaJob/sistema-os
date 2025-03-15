const sqlite3 = require('sqlite3').verbose();

// Conecta ao banco de dados (ou cria um novo se não existir)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Cria as tabelas após a conexão ser estabelecida
        criarTabelas();
    }
});

// Função para criar as tabelas
function criarTabelas() {
    db.serialize(() => {
        // Cria a tabela cliente
        db.run(`
            CREATE TABLE IF NOT EXISTS cliente (
                idCliente INTEGER PRIMARY KEY AUTOINCREMENT,
                nomeCliente TEXT NOT NULL,
                codSankhya TEXT NOT NULL UNIQUE,  // Alterado para TEXT
                telefone TEXT NOT NULL,          // Alterado para TEXT
                endereco TEXT NOT NULL,
                cep TEXT NOT NULL,               // Alterado para TEXT
                veiculo TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela cliente:', err.message);
            } else {
                console.log('Tabela cliente criada ou já existente.');
            }
        });

        // Cria a tabela orcamento
        db.run(`
            CREATE TABLE IF NOT EXISTS orcamento (
                idOrcamento INTEGER PRIMARY KEY AUTOINCREMENT,
                fkCliente INTEGER NOT NULL,
                distancia REAL NOT NULL,
                quantidadeEletrocalha REAL NOT NULL,
                quantidadeDutoCanaduto REAL NOT NULL,
                quantidadeEletrodutoPVC REAL NOT NULL,
                desviosCanaduto INTEGER NOT NULL,
                desviosPVC INTEGER NOT NULL,
                conduletes INTEGER NOT NULL,
                quantidadeCurvas INTEGER NOT NULL,
                observacao TEXT,
                FOREIGN KEY (fkCliente) REFERENCES cliente(idCliente)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela orçamento:', err.message);
            } else {
                console.log('Tabela orçamento criada ou já existente.');
            }
        });

        // Cria a tabela calculo
        db.run(`
            CREATE TABLE IF NOT EXISTS calculo (
                idCalculo INTEGER PRIMARY KEY AUTOINCREMENT,
                fkOrcamento INTEGER NOT NULL,
                totalGeral REAL NOT NULL,
                margemSeguranca INTEGER NOT NULL,
                eletrodutoRigido INTEGER NOT NULL,
                dutoCanaduto INTEGER NOT NULL,
                luva INTEGER NOT NULL,
                abracadeira INTEGER NOT NULL,
                conduletes INTEGER NOT NULL,
                curvas INTEGER NOT NULL,
                FOREIGN KEY (fkOrcamento) REFERENCES orcamento(idOrcamento)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela cálculo:', err.message);
            } else {
                console.log('Tabela cálculo criada ou já existente.');
            }
        });

        // Cria a tabela resultado
        db.run(`
            CREATE TABLE IF NOT EXISTS resultado (
                idResultado INTEGER PRIMARY KEY AUTOINCREMENT,
                fkOrcamento INTEGER NOT NULL,
                fkCalculo INTEGER NOT NULL,
                FOREIGN KEY (fkOrcamento) REFERENCES orcamento(idOrcamento),
                FOREIGN KEY (fkCalculo) REFERENCES calculo(idCalculo)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela resultado:', err.message);
            } else {
                console.log('Tabela resultado criada ou já existente.');
            }
        });
    });
}

module.exports = db;