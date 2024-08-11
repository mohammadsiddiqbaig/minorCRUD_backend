
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router/items.js')


const app = express();
const PORT = 5002;


app.use("/item",routes)
app.use(bodyParser.json());




app.listen(PORT , ()=> console.log("Server is running at port " + PORT));