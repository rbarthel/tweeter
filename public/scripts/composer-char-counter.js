$(function() {
  $('.new-tweet').find('textarea').on('keyup', function() {
    let charsLeft = 140 - $(this)[0].textLength;
    $(this).siblings('.counter').text(charsLeft);
  });
});