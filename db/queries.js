const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/userlist");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users ORDER BY id")
    .then(users => {
      res.status(200).json({
        users: users
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleUser = (req, res, next) => {
  db.one("SELECT * FROM users WHERE id = $1", [Number(req.params.id)])
    .then(user => {
      res.status(200).json({
        user: user
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addNewUser = (req, res, next) => {
  db.none("INSERT INTO users(username) VALUES ( ${username} )", {
    username: req.body.username
  })
    .then(() => {
      res.status(200).json({ message: "Added new user." });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteUser = (req, res, next) => {
  db.none("DELETE FROM users WHERE id = $1", [Number(req.params.id)])
    .then(() => {
      res.status(200).json({ message: "Deleted user." });
    })
    .catch(err => {
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  db.none("UPDATE users SET username = ${username} WHERE id = ${id}", {
    id: Number(req.params.id),
    username: req.body.username
  })
    .then(() => {
      res.status(200).json({ message: "Updated user." });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addNewUser,
  deleteUser,
  updateUser
};
