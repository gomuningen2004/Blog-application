import express from "express";
import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";


// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const year = new Date().getFullYear();

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentYear : year
  });
});

app.get("/about", (req, res) => {
  // res.sendFile((__dirname + "/public/static/contact.html"));
  res.render("about.ejs", {
    currentYear : year
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

