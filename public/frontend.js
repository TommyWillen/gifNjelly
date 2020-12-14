$(document).ready(function () {

//--------------Processing SIGN UP and LOG IN --------------------
// ----LOGIN-------------
//  var loginForm = $("form.login");
// var emailInput = $("input#email-input");
// var passwordInput = $("input#password-input");

// // When the form is submitted, we validate there's an email and password entered
// loginForm.on("submit", function(event) {
//   event.preventDefault();
//   var userData = {
//     email: emailInput.val().trim(),
//     password: passwordInput.val().trim()
//   };

//   if (!userData.email || !userData.password) {
//     return;
//   }

//   // If we have an email and password we run the loginUser function and clear the form
//   loginUser(userData.email, userData.password);
//   emailInput.val("");
//   passwordInput.val("");
// });

// ----SIGN-UP-------------

// function loginUser(email, password) {
//     $.post("/api/login", {
//       email: email,
//       password: password
//     })
//       .then(function() {
//         window.location.replace("/members");
//         // If there's an error, log the error
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }



//--------calling random gifs--------


    const localGifId = [];
    let limit = 4;
  
    function randomGif() {
      var apiKey = "W6nxutN5k5yRT98stgeJAxQjwXyesMTQ";
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
  
          var gifImg = response.data[i].images.fixed_width.url;
          console.log(gifImg);
  
          var gifTitle = response.data[i].title;
          var gifId = response.data[i].id;
        
  
          //set up for images and title data
          $("#img" + i).html("<img src=" + gifImg + ">");
          
          var selectionLink = $("<a>").attr("href", "gif.html")
          var card = $("<div>").addClass("card col-sm-2");
          var imgTop = $("<div>").addClass("card-img-top");
          var cardImg = $("<img>" + i).attr("src", gifImg).css({width: "150px", height: "150px,"});
          var title = $("<p>").text(gifTitle)
  
          //creating top image card
          imgTop.append(cardImg, title);
         
          card.append(imgTop);
           $("#imageCard").append(card);
          
          
          var cardBody = $("<div>").addClass("card-body");
  
          //individual id for each button
          var selectedBtn = "gifSelection"+i;
          var cardButton = $("<button>")
            .addClass("btn btn-primary").attr("id", selectedBtn).text("Select");
            cardButton.attr("data-id", gifId);
          
          selectionLink.append(cardButton)  
          cardBody.append(selectionLink);
         //appending to main div
          $("#imageCard").append(cardBody);
  
          
          //getting id on selected and next move. 
          cardButton.on("click", function(selection) {
            console.log(selection);
          //     const imgId = response.data[0].id;
          //   console.log(imgId);
          //   localGifId.push(imgId);
          });
        }
      });
    }
  
    console.log(localGifId);

    //Click handler
  
    $("#searchButton").on("click", function () {
      randomGif();
    });
  });
  