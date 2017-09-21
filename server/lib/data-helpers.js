"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet);
      callback(null, newTweet);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    deleteTweet: function(tweetID, callback) {
      db.collection("tweets").remove(tweetID, function(err, result) {
        if (err) throw err;
        callback('success');
      });
    }
  };
};
