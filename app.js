//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const { lowerCase } = require("lodash");
const { request } = require("express");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/", function (req,res){
  res.render("home", {startingContent:homeStartingContent, postArray:posts});
})



app.get("/compose", function (req,res){
  res.render("compose")
})

app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(requestedTitle===storedTitle){
      res.render("post", {postTitle:post.title, postBody:post.body})
    }else{
      console.log("Not a Match!");
    }
  });
  
});




app.post("/compose", function(req,res){
    const data = {
    title : req.body.postTitle,
    body : req.body.postBody
    };

    posts.push(data);

    res.redirect("/");

})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
