const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/travelgear', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String }
}, { timestamps: true }); 

const ProdutoviagemSchema = new mongoose.Schema({
    id_produtoviagem: { type: String, required: true },
    descricao: { type: String },
    fornecedor: { type: String },
    dataFabricacao: { type: Date },
    quantidadeEstoque: { type: Number }
}, { timestamps: true }); 

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produtoviagem = mongoose.model("Produtoviagem", ProdutoviagemSchema);

app.post("/cadastrousuario", async (req, res) => {
    const { email, senha } = req.body;

    const usuario = new Usuario({
        email: email,
        senha: senha,
    });

    try {
        const newUsuario = await usuario.save();
        res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/cadastroproduto", async (req, res) => {
    const { id_produtoviagem, descricao, fornecedor, dataFabricacao, quantidadeEstoque } = req.body;

    const produtoviagem = new Produtoviagem({
        id_produtoviagem: id_produtoviagem,
        descricao: descricao,
        fornecedor: fornecedor,
        dataFabricacao: dataFabricacao,
        quantidadeEstoque: quantidadeEstoque
    });

    try {
        const newProduto = await produtoviagem.save();
        res.json({ error: null, msg: "Cadastro ok", ProdutoId: newProduto._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});