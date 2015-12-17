
var User = require('../models/user.js')
  , Question = require('../models/question.js')
  , Answer = require('../models/answer.js')
  , Comment = require('../models/comment.js')
  , auth = require('./auth.js')
  , config = require('../config.js')

module.exports = function(app) {
  // , auth.ensureAuthenticated,
  // QUESTIONS INDEX
  app.get('/api/questions', function (req, res) {
    Question.find().exec(function (err, questions) {
      if (err) { return res.send(err) }

      res.send(questions);
    });
  });

  // QUESTIONS SHOW
  app.get('/api/questions/:id', function (req, res) {
    Question.findById(req.params.id).populate('answers').exec(function (err, question) {
      if (err) { return res.send(err) }

      res.send(question);
    });
  });

  // QUESTIONS CREATE
  app.post('/api/questions', auth.ensureAuthenticated, function (req, res) { 
    req.body.user = req.userId;

    Question.create(req.body, function (err, question) {
      if (err) { return res.send(err) }

      res.send(question);
    });
  });

  // QUESTIONS UPDATE
  app.put('/api/questions/:id', auth.ensureAuthenticated, function (req, res) { 
    req.body.user = req.userId;

    Question.findByIdAndUpdate(req.params.id, req.body, function (err, question) {
      if (err) { return res.send(err) }

      res.send(question);
    });
  });

  // QUESTIONS DELETE

}