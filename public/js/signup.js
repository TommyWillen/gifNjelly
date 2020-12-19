$(document).ready(() => {
  const firstNameInput = $("#first-name");
  const lastNameInput = $("#last-name");
  const userNameInput = $("#user-name");
  const emailInput = $("#email");
  const pass1Input = $("#password-input1");
  const pass2Input = $("#password-input2");

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  const signUpUser = (firstName, lastName, userName, email, password) => {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password
    })
      .then(() => {
        //Welcome fire
        Swal.fire({
          icon: "success",
          title: "Sign-up success!",
          text: "Welcome " + firstName + " " + lastName
        })
          .then(function(){
            window.location.replace("/member");
          }).catch(handleLoginErr);
        //end fire
        // window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      });
  };

  $("#sign-btn").click(function (event) {
    event.preventDefault();
    if(pass1Input.val().trim() !== pass2Input.val().trim()) {
      alert("Your passwords must match!");
      return;
    }
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
  //   firstNameInput.val("");
  //   lastNameInput.val("");
  //   userNameInput.val("");
  //   emailInput.val("");
  //   pass1Input.val("");
  //   pass2Input.val("");
  });


});