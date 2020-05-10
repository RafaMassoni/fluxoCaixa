const express = require('express');

const server = express();

server.use(express.json());

const caixa = 
[
    {
        id: 1,
        operacao: "receber",
        categoria: "Aporte inicial",
        valor: 10000.0,
        data: "10/05/2020"
    },
    {
        id: 2,
        operacao: "pagar",
        categoria: "Materia prima",
        valor: 3500.0,
        data: "11/05/2020"
    },
    {
        id: 3,
        operacao: "pagar",
        categoria: "aluguel",
        valor: 1000.0,
        data: "15/05/2020"
    }
]

// ler
server.get('/caixa', function(request, response) {
    response.json(caixa);
})

// adicionar
server.post('/caixa', function(request, response) {

    const {id, operacao, categoria, valor, data} = request.body;

    caixa.push({id,operacao,categoria,valor,data});

    response.status(204).send();

})

//alterar
server.put('/caixa/:id', function(request, response) {

    const id = request.params.id;
    const {operacao, categoria, valor, data} = request.body;

    for(let i = 0; i < caixa.length; i++) {
        if(caixa[i].id == id){
            caixa[i].operacao = operacao;
            caixa[i].categoria = categoria;
            caixa[i].valor = valor;
            caixa[i].data = data;
            break;
        }
    }

   return response.status(204).send();

})

//delete
server.delete('/caixa/:id', function(request, response) {

    const id = request.params.id;
    

    for(let i = 0; i < caixa.length; i++) {
        if(caixa[i].id == id){
            caixa.splice(i,1);
            break;
        }
    }

   return response.status(204).send();

})



server.listen(process.env.PORT || 3000);