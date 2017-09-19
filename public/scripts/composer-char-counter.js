$( document ).ready(function() {
  $('.new-tweet').find('textarea').on('keyup', function() {
    let charsLeft = 140 - $(this.value.length)[0];
    $(this).siblings('.counter').text(isNaN(charsLeft) ? 140 : charsLeft);
  });
});