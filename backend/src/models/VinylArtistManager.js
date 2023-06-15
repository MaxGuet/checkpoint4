/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class VinylManager extends AbstractManager {
  constructor() {
    super({ table: "artist_vinyl" });
  }

  insert(artist_vinyl) {
    return this.database
      .query(`insert into ${this.table} (vinyl_id, artist_id) values (?, ?)`, [
        artist_vinyl.vinyl_id,
        artist_vinyl.artist_id,
      ])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = VinylManager;
