const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const listaDeIntrutores = [
  {
    id: 1,
    nome: "guido",
    idade: 27,
    formacao: "Full-stack",
  },
  {
    id: 2,
    nome: "maria",
    idade: 17,
    formacao: "Full-stack",
  },
  {
    id: 3,
    nome: "junior",
    idade: 22,
    formacao: "Full-stack",
  },
  {
    id: 4,
    nome: "felipe",
    idade: 20,
    formacao: "Full-stack",
  },
];
let proximoId = 5;

app.get("/instrutores", (req, res) => {
  res.json(listaDeIntrutores);
});

app.get("/instrutores/:idInstrutor", (req, res) => {
  const instrutor = listaDeIntrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idInstrutor)
  );

  res.json(instrutor);
});

//POST CRIA NOVOS RECURSOS DENTRO DA COLEÇÃO

app.post("/instrutores", (req, res) => {
  console.log(req.body);
  const novoInstrutor = {
    id: proximoId,
    nome: req.body.nome,
    idade: req.body.idade,
    formacao: req.body.formacao,
  };
  listaDeIntrutores.push(novoInstrutor);

  proximoId += 1;

  res.json(novoInstrutor);
});

//PATCH EDITAR ELEMENTO

app.patch("/instrutores/:idInstrutor", (req, res) => {
  const instrutor = listaDeIntrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idInstrutor)
  );
  if (req.body.nome !== undefined) {
    instrutor.nome = req.body.nome;
  }
  if (req.body.idade !== undefined) {
    instrutor.idade = req.body.idade;
  }
  if (req.body.formacao !== undefined) {
    instrutor.formacao = req.body.formacao;
  }

  res.json(instrutor);
});

//PUT

app.put("/instrutores/:idInstrutor", (req, res) => {
  const instrutor = listaDeIntrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idInstrutor)
  );

  if (instrutor) {
    //substituir o existente
    instrutor.nome = req.body.nome;
    instrutor.idade = req.body.idade;
    instrutor.formacao = req.body.formacao;
    res.json(instrutor)
  } else {
    //inserir
    const novoInstrutor = req.body
    listaDeIntrutores.push(novoInstrutor)
    res.json(novoInstrutor)
  }
});

//DELETE

app.delete('/instrtutores:idInstrutor',(req,res)=>{
    const instrutor = listaDeIntrutores.find(
      (instrutor) => instrutor.id === Number(req.params.idInstrutor)
    );

    const indice = listaDeIntrutores.indexOf(instrutor)

    listaDeIntrutores.splice(indice,1)

    res.json(instrutor)
})
app.listen(3000);
