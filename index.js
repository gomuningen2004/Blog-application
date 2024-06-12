import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const year = new Date().getFullYear();

const posts = [{
  id : 1,
  title : "How its made",
  subTitle : "add in some hashtags and mentions",
  content : "This is how you add in some content"
}];

function addPost(title, subTitle, content){
  const newlyPosted = {id : posts.length + 1, title, subTitle, content};
  console.log(posts);
  posts.push(newlyPosted);
  console.log(posts);
}

function deletePost(postId){
  console.log(posts);
  posts = list.filter((post) => posts.id !== postId);
  console.log(posts);
}

app.get("/", (req, res) => {
  res.render("index", {
    currentYear: year,
    posts : posts
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    currentYear: year
  });
});

app.get("/newpost", (req, res) => {
  res.render("newpost", {
    currentYear: year
  });
});

app.post("/posting", (req, res)=> {
  console.log(req.body);
  addPost(req.body.title, req.body.subTitle, req.body.content);
  res.redirect("/");
});

app.delete("/deleting/:id", (req, res) => {
  deletePost(parseInt(req.params.id));
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

