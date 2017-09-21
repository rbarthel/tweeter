$(function() {
  $('.new-tweet').find('textarea').on('keyup', function() {
    let charsLeft = 140 - $(this)[0].textLength;

    const charCounter = $(this).siblings('.counter');
    charCounter.text(charsLeft);
    if (charsLeft < 0) {
      charCounter.css('color', 'red');
    }
    if (charsLeft >= 0) {
      charCounter.css('color', 'inherit');
    }
  });
});