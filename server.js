const express = require ('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    {id: 1, name:"diogo"},
    {id: 2, name:"diogo2"}
];

app.get("/item", (req, res) => {
    res.status(200).json(items);
})

app.listen(port, () => {
    console.log(`O Servidor está rodando em http://localhost:${port}`)});


