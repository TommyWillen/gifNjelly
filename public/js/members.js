let limit = 6;



//--------calling random gifs--------

function randomGif() {
  $.ajax({
    url: "/api/gif/random",
    method: "GET"
  }).then(function (response) {

    for (let i = 0; i < Math.ceil(limit/2); i++) {
      const gifImg = response.data[i].images.fixed_width.url;

      const gifTitle = response.data[i].title;
      const gifId = response.data[i].id;

      //set up for images and title data
      $("#img" + i).html("<img src=" + gifImg + ">");

      const selectionLink = $("<a>").attr("href", "/gifpost/"+gifId);
      const width = "width: 100%";
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
        .addClass("btn btn-info btn-sm btn-block select-btn")
        .attr("id", selectedBtn)
        .text("Select");
      cardButton.attr("data-id", gifId);

      selectionLink.append(cardButton);
      cardBody.append(title, selectionLink);
      card.append(cardBody);

      $("#imageCardLeft").append(card);

      //getting id on selected and next move.
      cardButton.on("click", function (gifId) {
        let newGifId = gifId.currentTarget.attributes[2].value;
        localGifUrl = newGifId;

        //Call function that will load selected gif and control gif.html
        location.href = "/newgif";
      });
    }
    for (let i = Math.ceil(limit/2); i < limit; i++) {
      const gifImg = response.data[i].images.fixed_width.url;

      const gifTitle = response.data[i].title;
      const gifId = response.data[i].id;

      //set up for images and title data
      $("#img" + i).html("<img src=" + gifImg + ">");

      const selectionLink = $("<a>").attr("href", "/gifpost/"+gifId);
      const width = "width: 100%";
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
        .addClass("btn btn-info btn-sm btn-block select-btn")
        .attr("id", selectedBtn)
        .text("Select");
      cardButton.attr("data-id", gifId);

      selectionLink.append(cardButton);
      cardBody.append(title, selectionLink);
      card.append(cardBody);

      $("#imageCardRight").append(card);

      //getting id on selected and next move.
      cardButton.on("click", function (gifId) {
        let newGifId = gifId.currentTarget.attributes[2].value;
        localGifUrl = newGifId;

        //Call function that will load selected gif and control gif.html
        location.href = "/newgif";
      });
    }
  });
}

//Click handler
$(document).ready(function () {

  $("#searchButton").on("click", function () {
    $("#imageCardLeft").empty();
    $("#imageCardRight").empty();
    randomGif();
  });

  $("#historyButton").click(function(){
    location.href = "/vote";
  });
});
