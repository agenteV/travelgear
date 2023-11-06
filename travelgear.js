const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/travelgear',
{   useNewUrlParser: true,
    useUnifiedTopology: true
});


const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});
const ProdutoviagemSchema = new mongoose.Schema({
    id_produtoviagem : {type : String, required : true},
    descricao : {type : String},
    fornecedor : {type : String},
    dataFabricacao : {type : Date},
    quantidadeEstoque : {type: Number}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produtoviagem = mongoose.model("Produtoviagem", ProdutoviagemSchema);

app.post("/cadastrousuario" , async(req , res)=>{
    const email = req.body.email;
    const senha = req.body.senha

    const usuario = new Usuario({
        email : email,
        senha : senha  
        
    });
        try{
            const newUsuario = await usuario.save();
            res.json({error : null, msg : "Cadastro ok ", UsuarioId : newUsuario._id});
        }catch (error) {}
        


});

// 2 model
app.post("/cadastroproduto", async(req , res)=>{
    const id_produtoviagem = req.body.id_produtoviagem;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataFabricacao = req.body.dataFabricacao;
    const quantidadeEstoque = req.body.quantidadeEstoque

    const produtoviagem = new Produtoviagem({
        id_produtoviagem : id_produtoviagem,
        descricao : descricao,
        fornecedor : fornecedor,
        dataFabricacao : dataFabricacao,
        quantidadeEstoque : quantidadeEstoque
    });
    try{
        const newProduto = await produtoviagem.save();
        res.json({error : null, msg : "Cadastro ok ", ProdutoId : newProduto._id});
    }catch (error) {}
});

app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrousuario.html");
})

app.get("/cadastroproduto", async(req, res)=>{
    res.sendFile(__dirname +"/cadastroproduto");
})

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
    

