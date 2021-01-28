$(document).ready(function() {
  // --- our code goes here ---
 
  /* jquery selector that will target the #tweet-text field for any user input change
     pluck string from the elements input form, then calculate its length
     create a finalCharCount thats 140 - the strings len. 
     re-render the element with the .counter class with this new value on every input change
     check if finalCharCount < 0, make .counter class red, otherwise change it back to black
     https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event */
  $('#tweet-text').on('input', function() {
    let stringFromElem = this.value;
    const stringLen = stringFromElem.length;
    const finalCharCount = 140 - stringLen;
    $('.counter').html(finalCharCount);

    if (finalCharCount < 0) {
      $('.counter').addClass('red');
    } else {
      $('.counter').removeClass('red');
    }
  });
});