$(document).ready(() => {

  function updateUI(postId){
    console.log("more stuff");
    let gifScoreSpan = $(`#gifScoreSpan${postId}`);
    let jellyScoreSpan = $(`#jellyScoreSpan${postId}`);
    $.ajax({
      method: "GET",
      url: "/api/updateVotes/" + postId,
    }).then( (results) => {
      $(gifScoreSpan).text(results.gifScore);
      $(jellyScoreSpan).text(results.jellyScore);
      console.log(results);
    });
  }

  function postVote(voteType, postId){
    let gif;
    let jelly;
    if (voteType === "gif"){
      gif = true;
      jelly = false;
    } else {
      jelly = true;
      gif = false;
    }

    let gifOrJelly = {
      gif: gif,
      jelly: jelly
    };
    $.ajax({
      method: "POST",
      url: "/api/vote/" + postId,
      data: gifOrJelly
    }).then ( function(){
      updateUI(postId);
    }
    );
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