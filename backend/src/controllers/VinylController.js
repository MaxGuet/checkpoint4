/* eslint-disable camelcase */
const path = require("path");
const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.vinyl
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.vinyl
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

const findByArtist = async (req, res) => {
  const { user } = req.params;
  await models.vinyl
    .findAllByArtist(user)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
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

  models.vinyl
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

const add = async (req, res) => {
  const { title, genre_id, name, genre_name, artist_id, user_id } = req.body;

  const { file } = req;
  if (!file) {
    return res.sendStatus(500);
  }

  const baseFolder = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    "images"
  );
  const originalName = path.join(baseFolder, file.originalname);
  const filename = path.join(baseFolder, file.filename);

  fs.rename(filename, originalName, (err) => {
    if (err) res.status(500);
  });

  const cover = `assets/images/${file.originalname}`;

  try {
    const result = await models.vinyl.insert({
      artist_id,
      genre_name,
      genre_id,
      name,
      title,
      cover,
    });

    const vinylartist = {
      artist_id,
      vinyl_id: result[0].insertId,
    };

    const userVinyl = {
      vinyl_id: result[0].insertId,
      user_id,
    };

    const newVinyl = {
      genre_id,
      genre_name,
      name,
      title,
      cover,
      id: result,
    };

    await models.artist.insert(newVinyl).catch((err) => {
      console.error(err);
    });
    await models.genre.insert(newVinyl).catch((error) => {
      console.error(error);
    });
    await models.vinylartist
      .insert(vinylartist)
      .then((vinylartistId) => {
        vinylartist.id = vinylartistId;
      })
      .catch((err) => {
        console.error(err);
      });
    await models.uservinyl
      .insert(userVinyl)
      .then((userVinylId) => {
        userVinyl.id = userVinylId;
      })
      .catch((err) => {
        console.error(err);
      });

    return res.status(201).json(newVinyl);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const destroy = (req, res) => {
  models.vinyl
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

module.exports = {
  findByArtist,
  browse,
  read,
  edit,
  add,
  destroy,
};
