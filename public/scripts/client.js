/* Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */
$(document).ready(function(){

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png"
          ,
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]
    
  /* loop through tweets, calls createTweetElement() for each tweet, take the return value & append it to the tweets container
   * grab the formatted return tweets HTML from our createTweetElement() function, update $tweetCollection to scoop up all of the HTML the loop returns
   * then append .incoming-tweets to add that HTML on the end */
  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const singleTweet = createTweetElement(tweet);
      $('.incoming-tweets').prepend($(singleTweet));
    }
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
  
  renderTweets(data);
});

