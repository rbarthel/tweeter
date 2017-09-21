$(function() {

  function attachButtonHandlers() {
    //unbind all handlers first to prevent dupliacation
    $('.fa').off();
    $('.fa-trash').on('click', function() {
      const $displayTweet = $(this).closest('.display-tweet');
      const tweetID = $displayTweet.data();
      $.post('/tweets/delete', tweetID, (result) => {
        $displayTweet.slideUp( () => { $displayTweet.remove(); });
      });
    });
    $('.fa-flag').on('click', function() {
      const $displayError = $(this).closest('footer').find('.error-display');
      $displayError.text('Don\'t be a snitch!').fadeIn(80).fadeOut(2000);
    });
    $('.fa-retweet').on('click', function() {
      const tweetText = 'text=' + $(this).closest('.display-tweet').find('article').text();
      const $displayError = $(this).closest('footer').find('.error-display');
      $.post("/tweets", tweetText, (data) => { renderSingleTweet(data); });
      $displayError.text('Retweeted!').fadeIn(80).fadeOut(2000);
    });
    $('.fa-heart').on('click', function() {
      const $footer = $(this).closest('footer');
      const tweetID = $(this).closest('.display-tweet').data();
      if ($(this).is('#liked')) {
        $(this).attr('id', '');
        $footer.find('.likeCounter').html((i, val) => {return +val-1;});
        tweetID.increment = -1;
        $.post("/tweets/update", tweetID, (result) => {});
      } else {
        $(this).attr('id', 'liked');
        $footer.find('.likeCounter').html((i, val) => {return +val+1;});
        $footer.find('.error-display').text('Liked!').fadeIn(80).fadeOut(2000);
        tweetID.increment = 1;
        $.post("/tweets/update", tweetID, (result) => {});
      }
    });
  }

  function createTweetElement(tweetData) {
    const $tweet = $('<section>').data("id", tweetData._id).addClass('display-tweet');

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
    const $displayError = $('<span>').addClass('error-display');
    const $tweetButtons = $('<span>').addClass('tweet-buttons');

    $footer.append($timeStamp).append($displayError).append($tweetButtons);

    const $buttonDelete = $('<i>').addClass('fa fa-trash');
    const $buttonFlag = $('<i>').addClass('fa fa-flag');
    const $buttonRetweet = $('<i>').addClass('fa fa-retweet');
    const $buttonLike = $('<i>').addClass('fa fa-heart');
    const $likeCounter = $('<i>').addClass('likeCounter').text(tweetData.likes);

    $tweetButtons.append($buttonDelete).append($buttonFlag).append($buttonRetweet).append($buttonLike).append($likeCounter);

    const $buttonDeleteTooltip = $('<span>').addClass('tooltiptext').text('Delete');
    const $buttonFlagTooltip = $('<span>').addClass('tooltiptext').text('Flag');
    const $buttonRetweetTooltip = $('<span>').addClass('tooltiptext').text('Retweet');
    const $buttonLikeTooltip = $('<span>').addClass('tooltiptext').text('Like');

    $buttonDelete.append($buttonDeleteTooltip);
    $buttonFlag.append($buttonFlagTooltip);
    $buttonRetweet.append($buttonRetweetTooltip);
    $buttonLike.append($buttonLikeTooltip);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach( (tweet) => {
      const tweetHTML = createTweetElement(tweet);
      $('#tweets-container').append(tweetHTML);
    });
    attachButtonHandlers();
  }

  function loadTweets() {
    $.getJSON( '/tweets', (tweets) => {
      const sortNewestFirst = (b, a) => a.created_at - b.created_at;
      const tweetsSorted = tweets.sort(sortNewestFirst);
      renderTweets(tweetsSorted);
    });
  }

  function renderSingleTweet(tweet) {
    $('#tweets-container').prepend(createTweetElement(tweet));
    attachButtonHandlers();
  }

  // show and hide the 'new tweet' box when the 'compose' button is clicked
  $('.compose').on('click', () => {
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('textarea').focus();
  });

  // when a user clicks the submit button, validate and then POST the tweet
  $('.new-tweet').find('input').on('click', (event) => {
    event.preventDefault();
    const $tweetText = $('.new-tweet').find('textarea');
    if (!$tweetText.val()) {
      $('.submitError').text('You can\'t tweet nothing!');
    } else if ($tweetText[0].textLength > 140) {
      $('.submitError').text('Your tweet is too long!');
    } else {
      $.post("/tweets", $tweetText.serialize(), (data) => { renderSingleTweet(data); });
      $('.submitError').text('');
      $('.counter').text('140');
      $tweetText.val('');
    }
  });

  loadTweets();

});