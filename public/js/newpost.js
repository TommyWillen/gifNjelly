$("#submitButton").on("click", function (event) {
  event.preventDefault();
  let gifId = $("#chosenGif").attr("data-id");
  let caption = $("#caption-input").val();
  let giphyPost = {
    caption: caption,
  };
  console.log(giphyPost);
  $.ajax({
    method: "POST",
    url: "/api/giphypost/" + gifId,
    data: giphyPost
  }).then(
    console.log(result)
  ).catch(function (err) {
    console.log(err);
  });
});