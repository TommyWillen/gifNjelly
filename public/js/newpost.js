$("#submitButton").click(function (event) {
  event.preventDefault();
  let gifId = $("#chosenGif").attr("data-id");
  let caption = $("#caption-input").val();
  let giphyPost = {
    gifId: gifId,
    caption: caption,
    gifId:gifId
  };
  $.ajax("/api/newpost", {
    type: "POST",
    data: giphyPost,
    success: function (response){
      console.log(response);
      location.href="/members";
    },
    error: function (err){
      console.log(err);
    }
  });
});
