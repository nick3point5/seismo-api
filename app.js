const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express()

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("success");
});

app.use("/post", routes.post);
app.use("/user", routes.user);


module.exports = app;