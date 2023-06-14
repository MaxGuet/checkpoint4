const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ name, mdp }) {
    return this.database
      .query("Select * from user where name = ?", [name])
      .then(([rows]) => {
        if (rows.length > 0) {
          return Promise.reject(new Error("User already exists"));
        }
        return this.database
          .query(`insert into ${this.table} (name, mdp) values (?, ?)`, [
            name,
            mdp,
          ])
          .then(([result]) => {
            return {
              id: result.insertId,
              name,
            };
          })
          .catch((err) => {
            console.error(err);
            return err.errno;
          });
      });
  }

  login(email) {
    return this.database
      .query(`select * from ${this.table} where email = ?`, [email])
      .then(([user]) => user)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}

module.exports = UserManager;
