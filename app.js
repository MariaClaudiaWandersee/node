const express = require("express");
const {randomUUID} = require("crypto");
const fs = require("fs"); //file system

const app = express();

app.use(express.json());

let products = []; //array em memória - db fake

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err){
        console.log("err")
    }
    else {
        products = JSON.parse(data);
    }
});

// POST     = inserir
// GET      = buscar dados
// PUT      = alterar
// DELETE   = remover

// Body = Sempre que quiser passar dados para a aplicação
// Params = product/55412125466
// Query =/product?id=6565232685632&value=232 (para mais de um parâmetro, utilizar o '&')

app.post("/products", (request, response) => {
    // Nome e Preço => name and price
    const {name, price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);
    productFile();
    return response.json(product)
});

app.get("/products", (request, response) =>{
    return response.json(products)
});

app.get("/products/:id", (request, response) =>{
    const { id } = request.params;
    const product = products.find((product) => product.id === id);
    return response.json(product);
});

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.params;
    
    const productIndex = products.findIndex((product) => product.id === id); //procura o index do produto
    //vai direto ao array alterar, exatamente na posição abaixo
    products[productIndex] = {
        ...products[productIndex], //id: products[productIndex],id,
        name,
        price
    };
    
    return response.json({message: "Produto alterado com sucesso!"})
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((prodcut) => product.id === id); //procura o index do produto

    products.splice(productIndex, 1);

    productFile();

    return response.json({message: "Produto removido com sucesso!"});
});

function productFile () {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if(err){
            console.log("err")
        }
        else {
            products = JSON.parse(data);
        }
    });
}

app.listen(3002, () => console.log("Servidor está rodando na porta 3002"));