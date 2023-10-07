// routes.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")
const encryp = require('bcryptjs')
const bcryptjs = require('bcryptjs')


// Exporta el router para que pueda ser utilizado como middleware en tu aplicación principal
module.exports = router;
