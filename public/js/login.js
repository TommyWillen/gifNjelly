$(document).ready(function(){
  const loginBtn = $("#login");
  const emailInput = $("#email");
  const passInput = $("#exampleInputPassword1");

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (email, password) => {
    console.log(email);
    console.log(password);
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        console.log("test2");
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  loginBtn.click(event => {
    console.log("test");
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    // userNameInput.val("");
    // passInput.val("");
  });
});