const AbstractManager = require("./AbstractManager");

class VinylManager extends AbstractManager {
  constructor() {
    super({ table: "vinyl" });
  }

  findAll() {
    return this.database.query(`SELECT *
      FROM ${this.table} AS v
      INNER JOIN artist_vinyl AS av ON v.id = av.vinyl_id
      INNER JOIN artist AS a ON av.artist_id = a.id;
    `);
  }

  insert(vinyl) {
    return this.database
      .query(
        `insert into ${this.table} (title, genre_id, have_want, cover) values (?, ?, ?, ?)`,
        [vinyl.title, vinyl.genre_id, vinyl.have_want, vinyl.cover]
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = VinylManager;
