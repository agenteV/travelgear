//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/travelgear", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const ProdutoviagemSchema = new mongoose.Schema({
    id_produtoviagem : {type : String, required : true},
    descricao : {type : String},
    fornecedor : {type : String},
    datafabricacao : {type : Date},
    quantidadeestoque : {type : Number}
});


const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produtoviagem = mongoose.model("Produtoviagem",ProdutoviagemSchema)


//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  
   
  const usuario = new Usuario({
    email: email,
    senha: senha
});

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

});


//rota de cadastro especifico
app.post("/cadastroprodutoviagem", async (req, res) => {
    
    
    const id_produtoviagem = req.body.id_produtoviagem;
    const descricao = req.body.descricao;
    const fornecedor = req.body.id_fornecedor;
    const datafabricacao = req.body.datafabricacao;
    const quantidadeestoque = req.body.quantidadeestoque;

    if(quantidadeestoque > 44){
        return res.status(400).json({error : "Estoque Esgotado, não é possivel cadastrar mais!"});
    }
    else if(quantidadeestoque <= 0){
        return res.status(400).json({error : "Você digitou um valor de estoque inválido. Insira um valor valido de estoque entre 1 e 44. "});
    }
     
    const produtoviagem = new Produtoviagem({
      id_produtoviagem: id_produtoviagem,
      descricao: descricao,
      fornecedor: fornecedor,
      datafabricacao: datafabricacao,
      quantidadeestoque: quantidadeestoque
    });
  
    try {
      const newProdutoviagem = await produtoviagem.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutoviagemId: newProdutoviagem._id });
    } catch (error) {}
  
  });


//rota padrao
app.get("/cadastroprodutoviagem.html", async (req, res) => {
    res.sendFile(__dirname + "/cadastroprodutoviagem.html");
  });

app.get("/cadastrousuario.html", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
  });


app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});