import mysql from "mysql";

const conexao = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234567",
  database: "bdcopa",
});

conexao.connect();

/**
 *
 * @param {string} sql instrução sql a ser executada
 * @param {string=id | [selecao, id]} valores a serem passados para o sql
 * @param {string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promise
 */

export const consulta = (sql, valores = "", mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (erro, result) => {
      if (erro) return reject(mensagemReject);
      const row = JSON.parse(JSON.stringify(result));
      return resolve(row);
    });
  });
};

export default conexao;
