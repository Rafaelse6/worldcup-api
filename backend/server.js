import app from "./src/App.js";
import conexao from "./infra/conexao.js";

const PORT = 3000;

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });

    console.log("Conexão realizada com sucesso");
  }
});
