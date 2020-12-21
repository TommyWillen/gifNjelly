$(document).ready(() => {

  function updateUI(postId, voteType){
    console.log("more stuff");
    let gifScoreSpan = $(`#gifScoreSpan${postId}`);
    let jellyScoreSpan = $(`#jellyScoreSpan${postId}`);
    $.ajax({
      method: "GET",
      url: "/api/updateVotes/" + postId,
    }).then( (results) => {
      let oldGifScore = $(gifScoreSpan).text();
      let oldJellyScore = $(jellyScoreSpan).text();
      oldGifScore = parseInt(oldGifScore)
      oldJellyScore = parseInt(oldJellyScore)
      let newGifScore = results.gifScore;
      let newJellyScore = results.jellyScore;
      $(gifScoreSpan).text(newGifScore);
      $(jellyScoreSpan).text(newJellyScore);
      console.log (`new score: ${newGifScore} ${newJellyScore}`)
      console.log (`new score: ${oldGifScore} ${oldJellyScore}`)
      console.log(voteType)
      if(newGifScore === oldGifScore && newJellyScore === oldJellyScore && voteType === "gif") {
        console.log("gif error")
        Swal.fire({
          imageUrl: "/Images/jelly-splat.png",
          imageHeight: 80,
          imageAlt: "Jelly Error Icon",
          title: "You already gifed this!",
        });
      } else if(newGifScore === oldGifScore && newJellyScore === oldJellyScore && voteType === "jelly") {
        console.log("jelly error")
        Swal.fire({
          imageUrl: "/Images/jelly-splat.png",
          imageHeight: 80,
          imageAlt: "Jelly Error Icon",
          title: "You already jellied this!",
        });
      }
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
      updateUI(postId, voteType);
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

  $("#returnButton").click(function(){
    location.href = "/members";
  });
});