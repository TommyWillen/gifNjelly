$("#submitButton").on("click", function (event) {
  event.preventDefault();
  let gifId = $("#chosenGif").attr("data-id");
  let caption = $("#caption-input").val();
  let giphyPost = {
    caption: caption,
    gifId:gifId
  };
  console.log(giphyPost);
  $.ajax({
    method: "POST",
    url: "/api/giphypost/" + gifId,
    data: giphyPost,
  })
    .then(function () {
      console.log(result);
      Swal.fire("Your comment has been added.").then(function () {
      location.href = "/oldpost";
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
