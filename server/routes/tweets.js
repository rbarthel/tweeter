// "use strict";

const userHelper    = require("../lib/util/user-helper");

const express       = require('express');
const tweetsRoutes  = express.Router();

const ObjectId = require('mongodb').ObjectID;

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/delete", function(req, res) {
    const deleteID = { _id: ObjectId(req.body.id) };
    DataHelpers.deleteTweet(deleteID, (result) => {
      res.status(201).json(result);
    });
  });

  tweetsRoutes.post("/update", function(req, res) {
    const updateID = { _id: ObjectId(req.body.id) };
    const updateBody = { $inc: { 'likes': Number(req.body.increment) } };
    DataHelpers.updateTweet(updateID, updateBody, (result) => {
      res.status(201).json(result);
    });
  });

  tweetsRoutes.post("/", function(req, res) {

    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err, tweet) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });

  return tweetsRoutes;

};
