const AbstractManager = require("./AbstractManager");

class VinylManager extends AbstractManager {
  constructor() {
    super({ table: "vinyl" });
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
