$("#submitButton").on("click", function (event) {
    event.preventDefault();
    let gifId = $("#chosenGif").attr("data-id");
    let caption = $("#caption-input").val();
    let userId = $("#userId").val();
    let giphyPost = {
      caption: caption,
      userId: userId
    };
    console.log(giphyPost);
    $.ajax({
      method: "POST",
      url: "/api/giphypost/" + gifId,
      data: giphyPost
    }).then(
      console.log(result)
      // location.href = "/members"
    ).catch(function (err) {
      console.log(err);
    });
  });