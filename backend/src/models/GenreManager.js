const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    super({ table: "genre" });
  }
}

module.exports = ArtistManager;
