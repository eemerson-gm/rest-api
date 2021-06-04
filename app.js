/*
    FILE: app.js
    PROJECT: Backend Programming Assignment
    PROGRAMMER: Eric Emerson
    FIRST-VERSION: 2021-03-31
    DESCRIPTION:
        The function of this file is to allow creating, editing, and deleting posts, replies, and likes on a MongoDB database.
*/

//Imports the express libraries.
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const uri = "mongodb://127.0.0.1:27017/test";

//Uses body parser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Creates a new mongodb connection.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Database Connected!"));

//Creates post information to be used in the database.
const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    replies: {
        type: Array,
        required: true,
        default: []
    },
    likes: {
        type: Array,
        required: true,
        default: []
    }
}, { autoCreate: true });
const Post = mongoose.model('Post', postSchema, 'posts');

//Starts the express application.
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");   
});

app.put("/api/posts/create/:postuser/:content", (req, res, next) => {
    
    //Trys to connect to the database.
    try {

        //Gets a new post instance.
        var post = new Post({ username: req.params.postuser, content: req.params.content });

        //Queries the MongoDB database.
        post.save(function(err, result) {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(201);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});

app.post("/api/posts/edit/:postuser/:content", (req, res, next) => {

    //Trys to connect to the database.
    try {

        //Queries the MongoDB database.
        Post.updateOne({ username: req.params.postuser }, { content: req.params.content }, (err, result) => {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(201);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});

app.delete("/api/posts/delete/:postuser", (req, res, next) => {

    //Trys to connect to the database.
    try {

        //Queries the MongoDB database.
        Post.deleteOne({ username: req.params.postuser }, (err, result) => {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(204);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});

app.put("/api/reply/create/:postuser/:replyuser/:content", (req, res, next) => {

    //Trys to connect to the database.
    try {

        //Gets a new post instance.
        var reply = {
            username: req.params.replyuser,
            content: req.params.content
        };

        //Queries the MongoDB database.
        Post.updateOne({ username: req.params.postuser }, { "$push": { "replies": reply } }, (err, result) => {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(201);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});

app.post("/api/reply/edit/:postuser/:replyuser/:content", (req, res, next) => {

    //Trys to connect to the database.
    try {

        //Queries the MongoDB database.
        Post.updateOne({ username: req.params.postuser, "replies.username": req.params.replyuser }, { "$set": { "replies.$.content": req.params.content } }, (err, result) => {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(201);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});

app.delete("/api/reply/delete/:postuser/:replyuser", (req, res, next) => {

    //Trys to connect to the database.
    try {

        //Queries the MongoDB database.
        Post.updateOne({ username: req.params.postuser }, { "$pull": { "replies": { username: req.params.replyuser } } }, (err, result) => {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(204);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});

app.put("/api/like/create/:postuser/:likeuser", (req, res, next) => {

    //Trys to connect to the database.
    try {

        //Queries the MongoDB database.
        Post.updateOne({ username: req.params.postuser }, { "$push": { "likes": req.params.likeuser } }, (err, result) => {

            //Checks if the query was successful.
            if(err){
                res.sendStatus(400);
            }else{
                res.sendStatus(201);
            }

            console.log(result);
            
        });

    } catch(e) {

        console.log(e);
        res.sendStatus(400);

    }

});