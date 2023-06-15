/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserVinylManager extends AbstractManager {
  constructor() {
    super({ table: "user_vinyl" });
  }

  insert(user_vinyl) {
    return this.database
      .query(`insert into ${this.table} (user_id, vinyl_id) values (?, ?)`, [
        user_vinyl.user_id,
        user_vinyl.vinyl_id,
      ])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = UserVinylManager;
