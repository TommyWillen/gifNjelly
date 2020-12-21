$(document).ready(() => {
  // initial dom elements identified to be used later
  const firstNameInput = $("#first-name");
  const lastNameInput = $("#last-name");
  const userNameInput = $("#user-name");
  const emailInput = $("#email");
  const pass1Input = $("#password-input1");
  const pass2Input = $("#password-input2");
  // handles the error if there is a server error.
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  // this function takes the information from the event listner and makes a post request to the server to create the user.
  const signUpUser = (firstName, lastName, userName, email, password) => {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password
    })
      .then(() => {
        // fancy popup window that appears on success before redirecting you to the members page
        Swal.fire({
          imageUrl: "/Images/gifMan.png",
          imageHeight: 80,
          imageAlt: "Jelly Error Icon",
          title: "Sign-up success!",
          text: "Welcome " + firstName + " " + lastName
        })
          .then(function(){
            window.location.replace("/members");
          }).catch(handleLoginErr);
      });
  };

  $("#sign-btn").click(function (event) {
    event.preventDefault();
    // tests to ensure the password added has the correct number of characters and that the confirmation matches
    if (pass1Input.val().trim().length < 8) {
      console.log(true);
      Swal.fire({
        imageUrl: "/Images/jelly-splat.png",
        imageHeight: 80,
        imageAlt: "Jelly Error Icon",
        title: "Oops...",
        text: "You password must be at least 8 characters long!",
      });
      return;
    }else if(pass1Input.val().trim() !== pass2Input.val().trim()) {
      console.log("also true");
      Swal.fire({
        imageUrl: "/Images/jelly-splat.png",
        imageHeight: 80,
        imageAlt: "Jelly Error Icon",
        title: "Oops...",
        text: "You passwords must match!",
      });
      return;
    }
    // sets up the object to be passed into the ajax call
    let userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: pass1Input.val().trim()
    };
    if (!userData.firstName || !userData.lastName || !userData.userName || !userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.firstName, userData.lastName, userData.userName, userData.email, userData.password);
  });


});