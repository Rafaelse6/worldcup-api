import express from "express";
const app = express();
app.use(express.json());

//Mock
const selecoes = [
  {
    id: 1,
    selecao: "Brasil",
    grupo: "G",
  },
  {
    id: 2,
    selecao: "Suíça",
    grupo: "G",
  },
  {
    id: 3,
    selecao: "Camarões",
    grupo: "G",
  },
  {
    id: 4,
    selecao: "Sérvia",
    grupo: "G",
  },
];

function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

function buscarIndexSelecao(id) {
  return selecoes.findIndex((selecao) => selecao.id == id);
}

app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção cadastrada com sucesso");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/selecoes", (req, res) => {
  res.status(200).send(selecoes);
});

app.get("/selecoes/:id", (req, res) => {
  res.json(buscarSelecaoPorId(req.params.id));
});

app.put("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  selecoes[index].selecao = req.body.selecao;
  selecoes[index].grupo = req.body.grupo;
  res.json(selecoes);
});

app.delete("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  selecoes.splice(index, 1);
  res.send(`Seleção com id ${req.params.id} excluída com sucesso`);
});

export default app;
