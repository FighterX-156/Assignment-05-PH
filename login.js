
const userInput = document.getElementById("username");
const passInput = document.getElementById("password");
const sign_btn = document.getElementById("sign_btn");
sign_btn.addEventListener("click", function () {
  //UserId && Pass validation
  if (userInput.value === "admin" && passInput.value === "admin123") {
    window.location.replace("/index.html")
  } else {
    alert("Wrong Username or Password")
  }
  
});
