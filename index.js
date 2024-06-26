import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const posts = [{
  id : 1,
  title : "Welcome to Posts",
  content : "Welcome, here you can post articles that you feel would be helpful to others. Currently image support isn't included but it will be implemented soon. And as there is no user login and other related features, please don't delete/modify existing posts of other potential users. And please checkout the Github repository if interested, improvements are welcome.",
  author : "Govardhan"
}];

function addPost(title, content, author){
  const newlyPosted = {id : posts.length + 1, title, content, author};
  posts.push(newlyPosted);
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
  addPost(req.body.title, req.body.content, req.body.author);
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

});

app.get("/editpost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);

  if (post) {
    res.render("editpost", {
      post: post
    });
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});


app.post("/updatepost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex !== -1) {
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    posts[postIndex].author = req.body.author;
    res.redirect("/");
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.listen(port, () => {
});

