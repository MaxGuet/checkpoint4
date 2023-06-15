const AbstractManager = require("./AbstractManager");

class VinylManager extends AbstractManager {
  constructor() {
    super({ table: "vinyl" });
  }

  findAll() {
    return this.database
      .query(`SELECT v.*, g.genre_name AS genre_name, a.name AS artist_name
    FROM ${this.table} AS v
    LEFT JOIN artist_vinyl AS av ON v.id = av.vinyl_id
    LEFT JOIN artist AS a ON av.artist_id = a.id
    LEFT JOIN genre AS g ON v.genre_id = g.id;
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
