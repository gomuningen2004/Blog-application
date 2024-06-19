import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "./config/passport.js";
import { addUser } from './models/User.js';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const posts = [{
  id: 1,
  title: "How its made",
  subTitle: "add in some hashtags and mentions",
  content: "This is how you add in some content"
}];

function addPost(title, subTitle, content) {
  const newlyPosted = { id: posts.length + 1, title, subTitle, content };
  posts.push(newlyPosted);
}

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.get("/", (req, res) => {
  res.render("index", {
    posts: posts,
    user: req.user
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/newpost", isAuthenticated, (req, res) => {
  res.render("newpost");
});

app.post("/posting", isAuthenticated, (req, res) => {
  addPost(req.body.title, req.body.subTitle, req.body.content);
  res.redirect("/");
});

app.get('/editpost/:id', isAuthenticated, (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.render('editpost', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/updatepost/:id', isAuthenticated, (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.subTitle = req.body.subTitle;
    post.content = req.body.content;
    res.redirect('/');
  } else {
    res.status(404).send('Post not found');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  addUser(username, password);
  res.redirect('/login');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.delete('/deleting/:id', isAuthenticated, (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(200).send({ message: 'Post deleted' });
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
