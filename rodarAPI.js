const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar cliente
app.post('/cliente_matt360', (req, res) => {
    const { cpf, nome, numero, nascimento, email } = req.body;

    const codigoDoMySQL = 'INSERT INTO cliente_matt360 (cpf, nome, numero, nascimento, email) VALUES (?, ?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [cpf, nome, numero, nascimento, email], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Cliente cadastrado!' });
    });
});

// Listar clientes
app.get('/cliente_matt360', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM cliente_matt360';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
