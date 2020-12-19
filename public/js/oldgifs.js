$(document).ready(() => {
  let oldGifScore;
  let newGifScore;
  let oldJellyScore;
  let newJellyScore;

  let gifClicked = false;
  let jellyClicked = false;


  function postVote(voteType, postId){
    let gif;
    let jelly;
    if (voteType === "gif" && gifClicked === false && jellyClicked === false){
      gif = true;
      jelly = false;
      oldGifScore = $("#gifScoreSpan").text();
      newGifScore = parseInt(oldGifScore) + 1;
      $("#gifScoreSpan").text(newGifScore);
      gifClicked = true;
    } else if (voteType === "gif" && gifClicked === true && jellyClicked === false){
      gif = true;
      jelly = false;
      oldGifScore = $("#gifScoreSpan").text();
      newGifScore = parseInt(oldGifScore) - 1;
      $("#gifScoreSpan").text(newGifScore);
      gifClicked = false;
    } else if (voteType === "gif" && gifClicked === false && jellyClicked === true){
      gif = true;
      jelly = false;
      oldGifScore = $("#gifScoreSpan").text();
      newGifScore = parseInt(oldGifScore) + 1;
      $("#gifScoreSpan").text(newGifScore);

      oldJellyScore = $("#jellyScoreSpan").text();
      newJellyScore = parseInt(oldJellyScore) - 1;
      $("#jellyScoreSpan").text(newJellyScore);
      gifClicked =true;
      jellyClicked =false;
    } else if (voteType === "jelly" && jellyClicked === false && gifClicked === false){
      jelly = true;
      gif = false;
      oldJellyScore = $("#jellyScoreSpan").text();
      newJellyScore = parseInt(oldJellyScore) + 1;
      $("#jellyScoreSpan").text(newJellyScore);
      jellyClicked = true;
    } else if (voteType === "jelly" && jellyClicked === true && gifClicked === false){
      jelly = true;
      gif = false;
      oldJellyScore = $("#jellyScoreSpan").text();
      newJellyScore = parseInt(oldJellyScore) - 1;
      $("#jellyScoreSpan").text(newJellyScore);
      jellyClicked = false;
    } else if (voteType === "jelly" && jellyClicked === false && gifClicked === true){
      jelly = true;
      gif = false;
      oldJellyScore = $("#jellyScoreSpan").text();
      newJellyScore = parseInt(oldJellyScore) + 1;
      $("#jellyScoreSpan").text(newJellyScore);

      oldGifScore = $("#gifScoreSpan").text();
      newGifScore = parseInt(oldGifScore) - 1;
      $("#gifScoreSpan").text(newGifScore);
      jellyClicked =true;
      gifClicked =false;
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
    postVote("gif", postId, gifClicked, jellyClicked);
  });
  $(".jellyVote").click(function(event) {
    event.preventDefault();
    postId = $(this).attr("data-id");
    postVote("jelly", postId, gifClicked, jellyClicked);
  });

});