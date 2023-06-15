const models = require("../models");

const browse = (req, res) => {
  models.VinylArtist.findAll()
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
  models.vinylartist
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.vinylartist
    .update(item)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const vinylartist = req.body;

  // TODO validations (length, format...)

  models.vinylartist
    .insert(vinylartist)
    .then((vinylartistId) => {
      vinylartist.id = vinylartistId;
      res.json(vinylartist).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = async (req, res) => {
  await models.vinylartist
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { browse, read, edit, add, destroy };
