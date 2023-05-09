import express from "express";
import conexao from "../infra/conexao.js";

const app = express();

app.use(express.json());

function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

function buscarIndexSelecao(id) {
  return selecoes.findIndex((selecao) => selecao.id == id);
}

app.post("/selecoes", (req, res) => {
  const selecao = req.body;
  const sql = "INSERT INTO selecoes SET ?";
  conexao.query(sql, selecao, (erro, result) => {
    if (erro) {
      console.log(erro);
      res.status(400).json({ erro: `${erro}` });
    } else {
      res.status(201).json(result);
    }
  });
});

app.get("/selecoes", (req, res) => {
  const sql = "SELECT * FROM selecoes";
  conexao.query(sql, (erro, result) => {
    if (erro) {
      console.log(erro);
      res.status(404).json({ erro: `${erro}` });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM selecoes WHERE id=?";
  conexao.query(sql, id, (erro, result) => {
    const linha = result[0];
    if (erro) {
      console.log(erro);
      res.status(404).json({ erro: `${erro}` });
    } else {
      res.status(200).json(linha);
    }
  });
});

app.put("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const selecao = req.body;
  const sql = "UPDATE selecoes SET ? WHERE id=?";
  conexao.query(sql, [selecao, id], (erro, result) => {
    if (erro) {
      console.log(erro);
      res.status(400).json({ erro: `${erro}` });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM selecoes WHERE id=?";
  conexao.query(sql, id, (erro, result) => {
    if (erro) {
      console.log(erro);
      res.status(404).json({ erro: `${erro}` });
    } else {
      res.status(200).json(result);
    }
  });
});

export default app;
