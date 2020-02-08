const express = require("express");
const app = express();
const routeAPI = require("./routes/routeAPI.js");
const routeHTML = require("./routes/routeHTML.js");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", routeAPI);
app.use("/", routeHTML);

app.listen(PORT, () => {
    console.log(`Server live - Port: ${PORT}`);
});