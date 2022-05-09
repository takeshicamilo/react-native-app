const express = require('express');
const cors = require('cors');
const sequelize = require('./src/utils/database.js');

const router = require('./src/routes/routes.js');


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    next();
});
app.use(cors());

app.use(router);

sequelize.sync();

app.listen(4040);