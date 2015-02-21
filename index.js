console.log("zaza");

var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/vocab');

//var Cat = mongoose.model('Cat', { name: String });
var Vocab = mongoose.model('Vocab', { word: String,
                                      meaning: String, 
                                      rightCount: Number,
                                      wrongCount: Number})

//var kitty = new Cat({ name: 'Zildjian' });
// var newVocab = new Vocab({ word: req. });

// kitty.save(function (err) {
//   if (err) // ...
//   console.log('meow');
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connection opened');
  // yay!
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

app.post('/add/word', function(req, res){
  var word = req.param('word');
  var meaning = req.param('meaning');
  console.log(word);
  console.log(meaning);

  var newVocab = new Vocab({ word: req.param('word'),
                             meaning: req.param('meaning'),
                             wrongCount: 0,
                             rightCount: 0});

  newVocab.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

})

app.get('/get/words', function(req, res){
  console.log('here are your words');
  Vocab.find(function (err, vocabs) {
    if (err) return console.error(err);
    console.log(vocabs)
    res.json(vocabs);
    //res.end(data.toString('utf8'));
    return;
    //res.sendFile(__dirname + '/index.html');
  })
})

http.listen(3000, function(){
  console.log('server listening on 3000');
})