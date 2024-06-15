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
  console.log(posts);
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/newpost", (req, res) => {
  res.render("newpost");
});

app.post("/posting", (req, res)=> {
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
    posts[postIndex].subTitle = req.body.subTitle;
    posts[postIndex].content = req.body.content;
    res.redirect("/");
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

