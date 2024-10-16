const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    { id : 1, name: "eng.software"},
    { id : 2, name: "sist.da info"}
];

app.get('/item', (req, res) => {
    res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.findIndex(item => item.id === id);
    if (item) {
        res.status(200).json(item);
    }else {
        res.status(404).json({mensage:"item não foi encontrado"})
    }
    
});

app.post('/item', (req, res) => {
    //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
    //do meu vetor e retorna ele em formato de inteiro...
    const newItem = { id: items.length + 1, ...req.body}
    const { name } = req.body;
    if(!name || name.length < 3 || typeof name !== 'string') {
        res.status(400).json({mensage:'item incorreto'})
    }
    else {
    //push insere um novo item no vetor...
    items.push(newItem);
    res.status(201).json(newItem)} 
});

app.delete('/item/:id', (req, res) => {
    item = [];
        res.status(200).json({mensage: "Item removido!"})
});

app.patch('/item/:id', (req , res) => {
    const id = parseInt(req.params.id); 
    const {name} = req.body;
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ mensage: "Item incorreto" });
    }

    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item não encontrado." });
    }

    items[itemIndex].name = name; // Atualiza o campo name
    res.status(200).json(items[itemIndex]);

});

app.get('/items/count', (req, res) => {
    res.status(200),json({count: items.length})
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});



