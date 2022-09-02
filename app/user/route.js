const express = require("express");
const { handlerGetUser, handlerPostUser } = require("./handler");
const router = express.Router();

// api 1
// get users
// mendapatkan seluruh users yang terdaftar
router.get("/", handlerGetUser);

// api 2
// create user
// menambahkan user baru
router.post('/', handlerPostUser);

module.exports = router;
