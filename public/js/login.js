// const { default: Swal } = require("sweetalert2");

$(document).ready(function(){
  const loginBtn = $("#login");
  const emailInput = $("#email");
  const passInput = $("#exampleInputPassword1");

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (email, password) => {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops",
          //========================
          html:
          "Your email or password does not match. Please try again or, " +
          "<a href=\"./signup\"><b>sign-up</b></a> ",
          text: "Your email or password does not match. Please try again or sign-up.",
        }).then(function(){
          location.reload();
        });


      });
  };

  loginBtn.click(event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };
    //fire
    if (userData.email === "" && userData.password === ""){
      Swal.fire({
        icon: "warning",
        title: "Please enter your email and password",
      }).then(function(){
        location.reload();
      });
    } else if (userData.email === ""){
      Swal.fire({
        icon: "warning",
        title: "Email can not be empty",
      }).then(function(){
        location.reload();
      });
    } else if (userData.password === ""){

      Swal.fire({
        icon: "warning",
        title: "Password can not be empty",
      }).then(function(){
        location.reload();
      });
    }
    //---end fire

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    // userNameInput.val("");
    // passInput.val("");
  });
});