/* Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */
$(document).ready(function(){

  /* loop through tweets, calls createTweetElement() for each tweet, take the return value & append it to the tweets container
   * grab the formatted return tweets HTML from our createTweetElement() function, update $tweetCollection to scoop up all of the HTML the loop returns
   * then append .incoming-tweets to add that HTML on the end */
  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const singleTweet = createTweetElement(tweet);
      $('.incoming-tweets').prepend($(singleTweet));
    }
  }

  const loadtweets = function() {

    // send ajax request from our client to the server
    $.ajax({ method: 'GET', url: '/tweets'})
    .then(function (allTweetsJson) {
      renderTweets(allTweetsJson);
    });
  }
      
  /* pass in each object of the data array of objects into here as an incoming paramater
     generate empty article HTMl template for tweet */
  const createTweetElement = (tweetObject) => {

    let $tweet = $("<article>").addClass("single-tweet");
    const createdAt = tweetObject.created_at;
    const date = moment(createdAt).fromNow()
    const name = tweetObject.user.name;
    const avatar = tweetObject.user.avatars;
    const handle = tweetObject.user.handle;
    const content = tweetObject.content.text;

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
        <p class ="user-text">${content}</p>
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
  
  // perform ajax call to submit new tweet to the server
  $('#user-form').on('submit', function(event){
    
    // prevent default bahavior of event that fired off on form submit
    event.preventDefault()
    const seralizedData = $(this).serialize();
    console.log("seralizedData: ", seralizedData);

    // send ajax request from our client to the server
    $.ajax({ method: 'POST', url: '/tweets', data: seralizedData})
    .then(function () {
      console.log("Made it");
    });
  });

  loadtweets();
});

