const express = require("express"); 
const htmlRoute = require("./routes/htmlRoute");
const apiRoute = require("./routes/apiRoute");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// api route
app.use("/api", apiRoute);
// html route
app.use("/", htmlRoute);

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));