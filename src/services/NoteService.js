//funcoes do banco de dados
const db = require("../db");

module.exports = {
  // GET /api/notes -> pega todas as notas ( id, title, content)
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM notes", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // GET /api/note/123 -> pega informacoes de uma nota especifica
  findById: async (id) => {
    return new Promise((resolve, reject) => {
      //o ? é o parametro da query que vai ser substituido pelo id
      db.query("SELECT * FROM notes WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(false);
        }
      });
    });
  },

  // POST /api/notes -> cria uma nova nota
  add: async (title, body) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO notes (title, body) VALUES (?, ?)",
        [title, body],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
        }
      );
    });
  },

  // PUT /api/notes/123 -> atualiza uma nota especifica
  update: async (id, title, body) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE notes SET title = ?, body = ? WHERE id = ?", 
        [title, body, id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    })
  },

  // DELETE /api/notes/123 -> deleta uma nota especifica
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM notes WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

};
