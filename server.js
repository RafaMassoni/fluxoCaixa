const express = require('express');

const database = require('./database');

const cors = require('cors');

const server = express();


server.use(cors());
server.use(express.json());


// lista
/*
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
] */

// ler
server.get('/caixa', async function(request, response) {
    //response.json(caixa);

    const dados = await database.select();
    return response.json(dados);
})

// adicionar
server.post('/caixa', async function(request, response) {

    const {operacao, categoria, valor, data, ativo} = request.body;
    
    //caixa.push({id,operacao,categoria,valor,data});
    
    const result = await database.create(operacao, categoria, valor, data, ativo);

    response.status(204).send();
})

//alterar
server.put('/caixa/:id', async function(request, response) {

    const id = request.params.id;
    const {operacao, categoria, valor, data, ativo} = request.body;

    /*
    for(let i = 0; i < caixa.length; i++) {
        if(caixa[i].id == id){
            caixa[i].operacao = operacao;
            caixa[i].categoria = categoria;
            caixa[i].valor = valor;
            caixa[i].data = data;
            break;
        }
    }
    */

    const result = await database.update(id, operacao, categoria, valor, data, ativo);

   return response.status(204).send();

})

//delete
server.delete('/caixa/:id', async function(request, response) {

    const id = request.params.id;
    
   /* for(let i = 0; i < caixa.length; i++) {
        if(caixa[i].id == id){
            caixa.splice(i,1);
            break;
        }
    }
   */

    const result = await database.delete(id);

   return response.status(204).send();

})



server.listen(process.env.PORT || 3000);