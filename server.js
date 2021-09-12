require('dotenv').config();
const express = require('express');
const routes = require("./src/routes/routes");

const app = express();
app.use(express.json());
const serverPort = process.env.PORT || 8001;

//enabling CORS
var cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(routes);

app.listen(serverPort, () => {
    console.log(`Server running and listening at port ${serverPort}`)});