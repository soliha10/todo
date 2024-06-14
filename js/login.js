const token = window.localStorage.getItem("token");
// if (!token) {
//   window.location.pathname = "./register.html";
// }else {
//   window.location.pathname = "./index.html"
// }



const elLoginForm = document.querySelector(".js-user-login");
const elLoginEmail = elLoginForm.querySelector(".js-login-email");
const elLoginPassword = elLoginForm.querySelector(".js-login-password");

async function userLogin() {
  const loginUserObj = {
    email: elLoginEmail.value.trim(),
    password: elLoginPassword.value
  }
  try {
    const response = await fetch("http://10.40.13.28:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginUserObj)
    });
    const data = await response.json();
    // console.log(data);
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      window.location.pathname = "./index.html"
    }
  } catch (error) {
    console.log(error);
  }
}

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userLogin();
});