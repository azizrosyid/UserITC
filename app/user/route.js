const express = require("express");
const {
  handlerGetUser,
  handlerPostUser,
  handlerPutUser,
  handlerDeleteUser,
} = require("./handler");
const router = express.Router();

// api 1
// get users
// mendapatkan seluruh users yang terdaftar
router.get("/", handlerGetUser);

// api 2
// create user
// menambahkan user baru
router.post("/", handlerPostUser);

// api 3
// update user
// mengupdate user yang sudah terdaftar
router.put("/:id", handlerPutUser);

// api 4
// delete user
// menghapus user yang sudah terdaftar
router.delete("/:id", handlerDeleteUser);

module.exports = router;
