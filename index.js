import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


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


app.get("/", (req, res) => {
  res.render("index",{
    posts : posts
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/newpost", (req, res) => {
  res.render("newpost");
});

app.post("/posting", (req, res)=> {
  console.log(req.body);
  addPost(req.body.title, req.body.subTitle, req.body.content);
  res.redirect("/");
});

app.delete('/deleting/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(200).send({ message: 'Post deleted' });
  } else {
    res.status(404).send({ message: 'Post not found' });
  }

  console.log(posts);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

