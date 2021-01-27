$(document).ready(function() {
  // --- our code goes here ---
 
  /* jquery selector that will target the #tweet-text field the user inputs their text and on each keypress, it adds 1 to a counter and console logs that out
     if the counter number goes negative, then update the counter style to change to red 
     otherwise if the counter goes into positives, change colour back to black
     https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
     https://api.jquery.com/val/ */
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