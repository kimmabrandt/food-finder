'use strict';
const yelp = require('yelp-fusion');


// yelp
const clientId = 'g-gEplfJ05_-3tnsXcBeRw';
const clientSecret = 'nojuLmB2XRoMR0HuK9r83CMEzsboQJLzVgSjlkSGwM2Da1ifAUuUzjuZbzB1WH6B';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

var getRating = function() {
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);

      rating = response.jsonBody.businesses[0].rating;
      console.log(rating);
    });
  }).catch(e => {
    console.log(e);
  });
}













//
// $(document).ready(function() {
//
//       $.ajax({
//           url: "https://api.tumblr.com/v2/blog/piiixels.tumblr.com/posts?limit=50",
//           dataType: 'jsonp',
//           data: {
//           api_key: apiKey
//           },
//           success: function(results){
//
//           var type = results.response.posts[i].type;
//
//           $("#tumblr-posts").append("<div class='item'><a href='/" + (k - i) + "'><img src=" + imgURL + " /></a></div>");
//
//           }
//         });
//
//
//
// });
//
