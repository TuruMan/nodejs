const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = 3000;

const dbConnectionOptions = {
    useMongoClient: true,
}

mongoose.connect('mongodb://localhost/nodekb', dbConnectionOptions);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
 console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
 console.log(err);
});

const app = express();

let Article = require('./models/article');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//home route
app.get('/', function(req, res) {
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
    res.render('index', {
      title: 'Articles',
      articles: articles
    });
  }
  });
});

//Add route
app.get('/articles/add', function(req, res) {
  res.render('add_articles', {
    title: 'Add Article '
  });
});

//start server
app.listen(port, function() {
  console.log('Server started on port ' + port);
});
