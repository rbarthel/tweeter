$( document ).ready(function() {
  $('.tweet-buttons').css('visibility','hidden');

  $('.all-tweets').on('mouseenter', function() {
    $(this).find('.tweet-buttons').css('visibility','visible');
    $(this).find('header').css('opacity','1');
  });
  $('.all-tweets').on('mouseleave', function() {
    $(this).find('.tweet-buttons').css('visibility','hidden');
    $(this).find('header').css('opacity','0.75');
  });
});