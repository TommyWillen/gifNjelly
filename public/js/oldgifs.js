// $(document).ready(() => {

// })

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
  });
}


let postId;
$(".gifVote").on("click", function (event){
  event.preventDefault();
  postId = $(this).attr("data-id");
  postVote("gif", postId);
});
$(".jellyVote").on("click", function (event){
  event.preventDefault();
  postId = $(this).attr("data-id");
  postVote("jelly", postId);
});