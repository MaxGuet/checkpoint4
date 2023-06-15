const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    super({ table: "artist" });
  }

  insert(artist) {
    return this.database
      .query(`insert into ${this.table} (name) values (?)`, [artist])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ArtistManager;
