import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const year = new Date().getFullYear();

app.get("/", (req, res) => {
  res.render("index", {
    currentYear: year
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    currentYear: year
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

