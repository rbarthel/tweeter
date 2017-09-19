$( document ).ready(function() {
  $('.tweet-buttons').css('visibility','hidden');
  $('.all-tweets').on('mouseenter', function() {
    $(this).find('.tweet-buttons').css('visibility','visible');
  });
  $('.all-tweets').on('mouseleave', function() {
    $(this).find('.tweet-buttons').css('visibility','hidden');
  });
});