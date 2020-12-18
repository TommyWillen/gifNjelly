require("dotenv").config();
let localGifUrl = "";
let limit = 4;
const apiKey = process.env.APIKEY;

//--------calling random gifs--------

function randomGif() {
  const queryUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=" +
    apiKey +
    "&limit=" +
    limit +
    "&rating=g";

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < limit; i++) {
      const gifImg = response.data[i].images.fixed_width.url;
      console.log(gifImg);

      const gifTitle = response.data[i].title;
      // const gifId = response.data[i].id;

      //set up for images and title data
      $("#img" + i).html("<img src=" + gifImg + ">");

      // const selectionLink = $("<a>").attr("href", "");
      const width = "width: 13rem"
      const card = $("<div>").addClass("card randomGifcol").attr("style", width);
      const imgTop = $("<div>").addClass("card-img-top");
      const cardImg = $("<img>" + i).attr("src", gifImg); //saving the url
      const title = $("<p>").text(gifTitle);

      //creating top image card
      imgTop.append(cardImg);

      card.append(imgTop);

      const cardBody = $("<div>").addClass("card-body");

      //individual id for each button
      const selectedBtn = "gifSelection" + i;
      const cardButton = $("<button>")
        .addClass("btn btn-primary")
        .attr("id", selectedBtn)
        .text("Select");
      cardButton.attr("data-id", gifImg);

      // selectionLink.append(cardButton);
      cardBody.append(title, cardButton);
      card.append(cardBody);

      $("#imageCard").append(card);

      //getting id on selected and next move.
      cardButton.on("click", function (gifUrl) {
        console.log(gifUrl);
        console.log("Value: ", gifUrl.currentTarget.attributes[2].value);
        let newGifUrl = gifUrl.currentTarget.attributes[2].value;
        localGifUrl = newGifUrl;

        //Call function that will load selected gif and control gif.html
        console.log("the url for localGifUrl:", localGifUrl);
        newPost();
      });
    }
  });
}

//loading newpost.html to do the next action
//this is where we can input comment
function newPost() {
  $.ajax({
    url: "/newpost",
    method: "POST",
    data: {
      //***********ERR****** */
      imagefile: localGifUrl,
    },
  }).then(function (err) {
    console.log("checking localGifUrl value: ", localGifUrl);

    if (err) throw err;

    //need to redirect
  });
}

//Click handler
$(document).ready(function () {
  $("#searchButton").on("click", function () {
    randomGif();
  });
});
