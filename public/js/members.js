
//--------calling random gifs--------


    const localGifId = [];
    let limit = 4;
    const apiKey = "W6nxutN5k5yRT98stgeJAxQjwXyesMTQ";

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
          const gifId = response.data[i].id;
        
  
          //set up for images and title data
          $("#img" + i).html("<img src=" + gifImg + ">");
          
          const selectionLink = $("<a>").attr("href", "gif.html");
          const card = $("<div>").addClass("card col-sm-2");
          const imgTop = $("<div>").addClass("card-img-top");
          const cardImg = $("<img>" + i).attr("src", gifImg);
          //.css({width: "150px", height: "150px,"});
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
            cardButton.attr("data-id", gifId);
          
          //loading gif.html to do the next action
          //this is where we can input comment

          selectionLink.append(cardButton);  
          cardBody.append(selectionLink);

        //   cardBody.append(cardButton)

         //appending to main div
          $("#imageCard").append(cardBody);
  
          
          //getting id on selected and next move. 
          cardButton.on("click", function(gifId) {
             console.log(gifId); 
            console.log("Value: ", gifId.currentTarget.attributes[2].value);
            let newGifId = gifId.currentTarget.attributes[2].value;
            localGifId.push(newGifId);
            //Call function that will load selected gif and control gif.html
            commentGif();

          });
        }
      });
    }
  
    console.log(localGifId);

    //Function to control comment in gif.html

 function commentGif(){
    const queryUrl =
        "https://api.giphy.com/v1/gifs/trending?api_key=" +
        apiKey +
        "&id="+localGifId+"&rating=g";
  
      $.ajax({
        url: queryUrl,
        method: "GET",
      }).then(function (response) {
        console.log(response)
// Do a POST request to server to send the selected Gif ID
//Do a POST request to server to send input from comment box

      })

    }

    //Click handler
  
    $("#searchButton").on("click", function () {
      randomGif();
      });
  // });
  