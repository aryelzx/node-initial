const express = require("express");
const { randomUUID } = require("crypto")
const fs = require("fs")

const app = express();

app.use(express.json())

let products = [];

fs.readFile("produtos.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }else{
        products = JSON.parse(data);
    }
})

/**
 * POST => INSERIR
 * GET => BUSCAR
 * PUT => ALTERAR 
 * DELETE => APAGAR
 */

/**
 * Body => sempre que for necessário enviar dados para a aplicação
 * Params => /produtos/123134421
 * Query => /produtos?id=1312312312&value=teste
 */

//post
app.post("/produtos", (request, response) => {

    const {name, price} = request.body;
    
    const produto = {
        name,
        price,
        id: randomUUID()
    }

    //adiciona o produto no array
    products.push(produto);

    createProductFile()
   
    return response.json(produto)
})

//get
app.get("/produtos", (request, response) => {
    return response.json(products)
})
//get com parametro id
app.get("/produtos/:id", (request, response) =>{
    // desestruturando o parametro
    const {id} = request.params
    const product = products.find(product => product.id === id)
    return response.json(product)
})

//put
app.put("/produtos/:id", (request, response) => {
    const {id} = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex(product => product.id === id)

    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    } 
    createProductFile()

    return response.json({message: "Produto alterado com sucesso!"})
})

//delete
app.delete("/produtos/:id", (request, response) => {
    const {id} = request.params

    const productIndex = products.findIndex(product => product.id === id)

    products.splice(productIndex, 1)

    createProductFile()
    
    return response.json({message: "produto removido com sucesso"})
})

const createProductFile = () => {
    fs.writeFile("produtos.json", JSON.stringify(products), (err) =>{
        if(err){
            console.log(err)
        }else{
            console.log("Produto Inserido")
        }
    })
}
app.listen(4001, () => console.log("server rodando em http://localhost:4001/"))