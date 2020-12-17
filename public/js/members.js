    let localGifUrl = "";
    let limit = 4;
    const apiKey = "W6nxutN5k5yRT98stgeJAxQjwXyesMTQ";

  
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
        const card = $("<div>").addClass("card col-sm-2");
        const imgTop = $("<div>").addClass("card-img-top");
        const cardImg = $("<img>" + i).attr("src", gifImg);//saving the url
        const title = $("<p>").text(gifTitle);

        //creating top image card
        imgTop.append(cardImg);

        card.append(imgTop);
        // card.append(title);
        $("#imageCard").append(card, title);


        const cardBody = $("<div>").addClass("card-body");

        //individual id for each button
        const selectedBtn = "gifSelection"+i;
        const cardButton = $("<button>")
          .addClass("btn btn-primary").attr("id", selectedBtn).text("Select");
        cardButton.attr("data-id", gifImg);

        //loading newpost.html to do the next action
        //this is where we can input comment

        // selectionLink.append(cardButton);
        cardBody.append(cardButton);

        //   cardBody.append(cardButton)

         //appending to main div
          $("#imageCard").append(cardBody);
  
          
          //getting id on selected and next move. 
          cardButton.on("click", function(gifUrl) {
            
             console.log(gifUrl); 
            console.log("Value: ", gifUrl.currentTarget.attributes[2].value);
            let newGifUrl = gifUrl.currentTarget.attributes[2].value;
            // debugger;
            localGifUrl = newGifUrl;
            //Call function that will load selected gif and control gif.html
            newPost();

          });
        }
      });
  }
  
    console.log(localGifUrl);

    //loading newpost.html to do the next action
    //this is where we can input comment
 function newPost(){
   
         $.ajax({
          url:"/newpost",
          method:"POST",
          data: {
            imagefile: localGifUrl//***********ERR****** */
          }
        })
        .then(function(err){
          if (err) throw err;

        })
// Do a POST request to server to send the selected Gif ID
//Do a POST request to server to send input from comment box
        
      // })

    }

    //Click handler
  $(document).ready(function(){
    $("#searchButton").on("click", function () {
      randomGif();
      });
  })
 
  
  
