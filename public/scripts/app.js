/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "<script>alert('Je pense , donc je suis');</script>"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

  // just use moment

  // function formatTimeAgo(createdAt) {

  //   // get time ago in minutes
  //   let timeDifference = (Date.now() - createdAt) / 60000;

  //   if (timeDifference < 60) {
  //     timeDifference = Math.floor(timeDifference);
  //     if (timeDifference === 1) {
  //       return timeDifference + ' minute ago';
  //     } else {
  //       return timeDifference + ' minutes ago';
  //     }

  //   }
  //   if (timeDifference < 1440) {
  //     timeDifference = Math.floor(timeDifference / 60);
  //     if (timeDifference === 1) {
  //       return timeDifference + ' hour ago';
  //     } else {
  //       return timeDifference + ' hours ago';
  //     }
  //   }
  //   if (timeDifference < 43800) {
  //     timeDifference = Math.floor(timeDifference / 1440);
  //     if (timeDifference === 1) {
  //       return timeDifference + ' day ago';
  //     } else {
  //       return timeDifference + ' days ago';
  //     }
  //   }
  //   if (timeDifference < 525600) {
  //     timeDifference = Math.floor(timeDifference / 43800);
  //     if (timeDifference === 1) {
  //       return timeDifference + ' month ago';
  //     } else {
  //       return timeDifference + ' months ago';
  //     }
  //   } else {
  //     timeDifference = Math.floor(timeDifference / 525600);
  //     if (timeDifference === 1) {
  //       return timeDifference + ' year ago';
  //     } else {
  //       return timeDifference + ' years ago';
  //     }
  //   }
  // }


  function createTweetElement(tweetData) {
    const $tweet = $('<section>').addClass('display-tweet');

    const $header = $('<header>');
    const $article = $('<article>');
    const $footer = $('<footer>');

    $tweet.append($header).append($article).append($footer);

    const $userAvatar = $('<img>').attr('src', tweetData.user.avatars.regular);
    const $userName = $('<h2>').text(tweetData.user.name);
    const $userHandle = $('<p>').text(tweetData.user.handle);

    $header.append($userAvatar).append($userName).append($userHandle);

    const $tweetText = $('<p>').text(tweetData.content.text);

    $article.append($tweetText);

    const $timeStamp = $('<p>').text(tweetData.created_at);
    const $tweetButtons = $('<span>').addClass('tweet-buttons');

    $footer.append($timeStamp).append($tweetButtons);

    const $buttonFlag = $('<i>').addClass('fa fa-flag');
    const $buttonRetweet = $('<i>').addClass('fa fa-retweet');
    const $buttonLike = $('<i>').addClass('fa fa-heart');

    $tweetButtons.append($buttonFlag).append($buttonRetweet).append($buttonLike);

    const $buttonFlagTooltip = $('<span>').addClass('tooltiptext').text('Flag');
    const $buttonRetweetTooltip = $('<span>').addClass('tooltiptext').text('Retweet');
    const $buttonLikeTooltip = $('<span>').addClass('tooltiptext').text('Like');

    $buttonFlag.append($buttonFlagTooltip);
    $buttonRetweet.append($buttonRetweetTooltip);
    $buttonLike.append($buttonLikeTooltip);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(tweet){
      const tweetHTML = createTweetElement(tweet);
      $('#tweets-container').append(tweetHTML);
    });
  }

renderTweets(data);

});