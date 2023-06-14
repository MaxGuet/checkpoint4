const models = require("../models");
const { hashPassword } = require("../utils/Auth");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      const clearRows = rows.map((row) => {
        const { mdp, ...clearRow } = row;
        return clearRow;
      });
      res.send(clearRows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const clearRows = rows.map((row) => {
          const { mdp, ...clearRow } = row;
          return clearRow;
        });
        res.send(clearRows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const { name, email, mdp } = req.body;
  const hashed = await hashPassword(mdp);
  if (!hashed) {
    return res.sendStatus(500);
  }
  try {
    const result = await models.user.insert({
      name,
      email,
      mdp: hashed,
    });
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(409).send("User already exists");
    }
    console.error(err);
    return res.sendStatus(500);
  }
};

const login = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.sendStatus(422);
  const result = await models.user.login(email);
  if (result) {
    const [firstResult] = result;
    if (firstResult != null) {
      req.user = firstResult;
      next();
    } else return res.sendStatus(403);
  } else return res.sendStatus(500);
  return true;
};

module.exports = {
  add,
  login,
  browse,
  read,
};
