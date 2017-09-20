/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

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

    const $timeStamp = $('<p>').text(moment(tweetData.created_at).fromNow());
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

  function loadTweets() {
    $.getJSON( '/tweets', function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  // when a user clicks the submit button, validate and then POST the tweet
  $('.new-tweet').find('input').on('click', function(event) {
    event.preventDefault();
    const $tweetText = $(this).siblings('textarea');
    if (!$tweetText.val()) {
      console.log('empty input');
      $('.submitError').text('You can\'t tweet nothing!');
    } else if ($tweetText[0].textLength > 140) {
      console.log('too many chars');
      $('.submitError').text('Your tweet is too long!');
    } else {
      $('.submitError').text('');
      $tweetText.val('');
      $.post("/tweets", $tweetText.serialize());
    }
  });

});