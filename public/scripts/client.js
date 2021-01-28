
/* loop through tweets, calls createTweetElement() for each tweet, take the return value & append it to the tweets container
 * grab the formatted return tweets HTML from our createTweetElement() function, update $tweetCollection to scoop up all of the HTML the loop returns
 * then append .incoming-tweets to add that HTML on the end */
const renderTweets = function(tweets) {

  for (const tweet of tweets) {
    const singleTweet = createTweetElement(tweet);
    $('.incoming-tweets').prepend($(singleTweet));
  }
}

// function to send ajax request from our client to the server
const loadtweets = function() {
  $.ajax({ method: 'GET', url: '/tweets'})
  .then(function (allTweetsJson) {
    renderTweets(allTweetsJson);
  });
}

// this function converts <script> tags into &lt, making a XSS attack impossible
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// https://stackoverflow.com/questions/10082330/dynamically-create-bootstrap-alerts-box-through-javascript
// call the #alert_placeholder temp div and populate it with the boostrap banner
fillAlert = function(error) {
  $('#alert_placeholder').html('<div class="alert alert-danger" role="alert" style="position:abolute;z-index:999;">'+error+'</span> </div>')
}

// function that when called, will dismiss any alerts after 3 seconds
dismissAlert = function() {
  window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
  }, 3500);
}

/* function to perform ajax call to submit new tweet to the server, it does this by grabbing the text inside the user-form
 * it then takes that plaintext, seralizes it as JSON, then sends it to our server via ajax to handle 
 * we also have a check to ensure the value in the seralized text is not empty and not over 140 chars
 * call load tweets to update the new tweet after we submit it */
const sendTweet = function() {
  $('#user-form').on('submit', function(event){
    event.preventDefault();
    const seralizedData = ($('form').serialize());
    const valToVerify = $('#tweet-text').val();
    const valToVerifyLen = valToVerify.length;
    const errors = {
      empty: "Sorry the input field cannot be empty. Try again!",
      tooLong: "Sorry your input is too long. Try again!",
    };

    if (!valToVerify) {
      fillAlert(errors.empty);
      dismissAlert();
      return;
    } else if (valToVerifyLen > 140) {
      fillAlert(errors.tooLong);
      dismissAlert();
      return;
    }

    $.ajax({ method: 'POST', url: '/tweets', data: seralizedData})
    .then(function () {
      console.log("Made it");
    });

    loadtweets();
  });
}
    
/* function that is passed in each object of the data array of objects as an incoming paramater
 * this function generates a new HTML template with the tweet info in it to return to where needed
 * we also scrub the incoming HTML the server sends back to the client and it surrounds the html in <p> tags to prevent an XSS attack */
const createTweetElement = (tweetObject) => {
  let $tweet = $("<article>").addClass("single-tweet");
  const createdAt = tweetObject.created_at;
  const date = moment(createdAt).fromNow()
  const name = tweetObject.user.name;
  const avatar = tweetObject.user.avatars;
  const handle = tweetObject.user.handle;
  const content = tweetObject.content.text;
  const safeHTML = `${escape(content)}`;
  console.log("safeHTML", safeHTML)

  let html = 
  `<article class="single-tweet">
    <div class="tweet-header">
      <div class="tweet-avatar">
        <img src="${avatar}">
        <p class="name">${name}</p>
      </div>
      <div class="header-handle">
        <p>${handle}</p>
      </div>
    </div>
    <div class="tweet-body-text">
      <p class ="user-text">${safeHTML}</p>
      <hr>
    </div>
    <div class="tweet-footer">
      <div class="timestamp">
        <p>${date}</p>
      </div>
      <div class="footer-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </article>`

  $tweet.append(html);
  return html;
}

/* client-side JS logic goes here, jQuery is already loaded
 * reminder: Use (and do all your DOM work in) jQuery's document ready function 
 * call functions containing ajax calls ot our server to send user tweets and get all tweets*/
$(document).ready(function(){
  sendTweet();
  loadtweets();
});

