const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

var app = express();

const PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, function () {
    console.log("Listening on port:8080. Please visit http://localhost:%s/ in your browser.", PORT, PORT);
});