$(document).ready(() => {
  let oldGifScore;
  let newGifScore;
  let oldJellyScore;
  let newJellyScore;
  function postVote(voteType, postId){
    let gif;
    let jelly;
    if (voteType === "gif"){
      gif = true;
      jelly = false;
      oldGifScore = $("#gifScoreSpan").text();
      newGifScore = parseInt(oldGifScore) + 1;
      $("#gifScoreSpan").text(newGifScore);
    } else {
      jelly = true;
      gif = false;
      oldJellyScore = $("#jellyScoreSpan").text();
      newJellyScore = parseInt(oldJellyScore) + 1;
      $("#gifScoreSpan").text(newJellyScore);
    }
    let gifOrJelly = {
      gif: gif,
      jelly: jelly
    };
    $.ajax({
      method: "POST",
      url: "/api/vote/" + postId,
      data: gifOrJelly
    });
  }


  let postId;
  $(".gifVote").click(function(event) {
    event.preventDefault();
    postId = $(this).attr("data-id");
    postVote("gif", postId);
  });
  $(".jellyVote").click(function(event) {
    event.preventDefault();
    postId = $(this).attr("data-id");
    postVote("jelly", postId);
  });

});