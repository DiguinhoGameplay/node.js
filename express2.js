const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('./itemsdb.sqlite', (err) => {
    if(err) {
        console.err('Deu Erro!');
    } else {
        console.log('Deu Certo!');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    descricao TEXT,
    dataCriacao TEXT DEFAULT CURRENT_TIMESTAMP)`, (err) => {
        if (err) {
            console.error('DEU ERROOO');
        } else {
            console.log('deu bomm');
        }
});

app.post('/item', (req, res) => {
    const {name, descricao} = req.body;
    const query = `INSERT INTO items (name, descricao) VALUES (?,?)`

    db.run(query, [name, descricao], (err) => {
        if(err) {
            res.status(400).json({ message: err.message});
        } else {
            res.status(201).json({ id: this.lastID, name, descricao});
        }
    })
})

app.get('/items', (req, res) => {
    const query = `SELECT * FROM items`;
    db.all(query,[], (err, rows) => {
        if(err) {
            console.error({ message: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM items WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else if (!row) {
            res.status(404).json({message:'Item não encontrado'});
        } else {
            res.status(200).json(row);
        }
    });
});

app.put('/item/:id', (req, res) => {
    const id = req.params.id;
    const { name, descricao } = req.body;
    const query = `UPDATE items SET name = ?, descricao = ? WHERE id = ?`;

    db.run(query, [name, descricao, id], function (err) {
        if (err) {
            res.status(400).json({ message: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Item não encontrado' });
        } else {
            res.status(200).json({ id, name, descricao });
        }
    });
});

app.patch('/item/:id', (req, res) => {
    const id = req.params.id;
    const { name, descricao } = req.body;
    const updates = [];
    const params = [];

    if (name) {
        updates.push('name = ?');
        params.push(name);
    }
    if (descricao) {
        updates.push('descricao = ?');
        params.push(descricao);
    }

    if (updates.length === 0) {
        return res.status(400).json({ message: 'Nenhum campo para atualizar' });
    }

    const query = `UPDATE items SET ${updates.join(', ')} WHERE id = ?`;
    params.push(id);

    db.run(query, params, function (err) {
        if (err) {
            res.status(400).json({ message: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Item não encontrado' });
        } else {
            res.status(200).json({ id, name, descricao });
        }
    });
});

app.delete('/item/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM items WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            res.status(400).json({ message: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message:'Item não encontrado' });
        } else {
            res.status(200).json({ message:'Item deletado' });
        }
    });
});

app.listen(port,() => {
    console.log("Servidor rodando na porta http://localhost:3000");

})