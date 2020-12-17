$(Document).ready(function(){
  const loginForm = $(".login");
  const userNameInput = $("#user-name");
  const passInput = $("#exampleInputPassword1");

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (userName, password) => {
    $.post("/api/login", {
      userName: userName,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      userName: userNameInput.val().trim(),
      password: passInput.val().trim()
    };

    if (!userData.userName || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    userNameInput.val("");
    passInput.val("");
  });
});