const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    super({ table: "genre" });
  }

  insert(genre) {
    return this.database
      .query(`insert into ${this.table} (genre_name) values (?)`, [genre.name])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ArtistManager;
