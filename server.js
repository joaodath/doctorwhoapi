require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
const serverPort = process.env.PORT || 8001;

app.listen(serverPort, () => {
    console.log(`Server running and listening at port ${serverPort}`)});