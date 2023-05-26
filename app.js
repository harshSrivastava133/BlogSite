//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Welcome to our blog-sharing website! Our platform is designed to provide a space for writers and readers to come together and share their thoughts and ideas. Whether you're an experienced blogger or just getting started, our website offers a supportive community where you can express yourself and connect with like-minded individuals. As a writer, you can create your own blog posts and share them with the world. Simply create an account, choose a title for your blog post, and start writing! Your post will be displayed on our home page, where other users can read and comment on it. You can also browse other users' posts and leave comments to start a conversation. Our website is designed with user experience in mind. We've created a responsive and user-friendly interface using HTML, CSS, and JavaScript. We've also implemented a search functionality to make it easy for you to find relevant content, as well as categories and tags to help organize posts by topic. Whether you're looking for inspiration, knowledge, or just a good read, our website is the place to be. So start writing, start reading, and start connecting with others who share your passion for blogging.";
const aboutContent = "Welcome to our blog-sharing website! We're a team of passionate writers and developers who believe that everyone deserves a platform to share their thoughts and ideas. Our goal is to create a community where writers and readers can come together to learn from each other and foster a sense of connection and belonging. Our website is built on the latest web technologies, including HTML, CSS, JavaScript, Node.js, and MongoDB. We've put a lot of thought and effort into creating a responsive and user-friendly interface that makes it easy for you to read and write blog posts. At our core, we believe in the power of words to inspire, educate, and transform. We believe that by sharing our stories and experiences, we can create a better world. That's why we've created this website as a platform for writers and readers to connect, learn, and grow together. We're constantly working to improve our website and add new features that make it easier for you to share your content and connect with others. We welcome your feedback and suggestions, and we're always here to answer any questions you may have. Thank you for being a part of our community, and we look forward to reading and sharing your amazing blog posts!";
const contactContent= "We'd love to hear from you! If you have any questions, comments, or feedback about our blog-sharing website, please feel free to contact us using the form below. Alternatively, you can reach out to us directly at "
const contact2Content=" .We'll do our best to respond to your inquiry as soon as possible. If you're experiencing any technical difficulties with the website, please let us know and we'll do our best to assist you. We want to ensure that our website is running smoothly for all users, so your feedback is greatly appreciated. Thank you for being a part of our community, and we look forward to hearing from you!"

var posts=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  res.render("home", {"stringValue": homeStartingContent,
    "postsH":posts
  });
});


app.get("/about", function(req,res){
  res.render("about", {"stringValue": aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {"stringValue": contactContent,
                         "string2Value": contact2Content});
});

app.get("/compose", function(req,res){
  res.render("compose", {});
});

app.get("/posts/:title", function(req,res){
  posts.forEach(function(po){
    if(lodash.lowerCase(po.postT)===lodash.lowerCase(req.params.title)){
      res.render("post", {"pos": po});
    }
  })
});


app.post("/compose", function(req,res){
  let post = {
    postT: req.body.postTitle,
    postB: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/")
})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
