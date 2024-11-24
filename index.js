const express = require('express');

const app = express();
const port = 3000;


let tarefas = [
    { id: 1, descricao: "Estudar Node.JS", concluido: false},
    { id: 2, descricao: "Fazer exercícios", concluido: true}
];

app.use(express.json());

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/tarefas', (req,res) => {
    const novaTarefa = req.body;
    novaTarefa.id = tarefas.length + 1;
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa)
})

app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, concluido } = req.body;
    const tarefa = tarefas.find(t => t.id == id);

    if (!tarefa) {
        return res.status(404).send('Tarefa não encontrada');
    }

    tarefa.descricao = descricao || tarefa.descricao;
    tarefa.concluido = concluido !== undefined ? concluido : tarefa.concluido;

    res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    tarefas = tarefas.filter(t => t.id != id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`API rodando na http://localhost:${port}`)
});