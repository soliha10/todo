const getToken = window.localStorage.getItem("token");
if (getToken) {
  window.location.pathname = "./index.html";
}



const elRegisterForm = document.querySelector(".js-user-register");
const elRegisterUsername = elRegisterForm.querySelector(".js-user-name");
const elRegisterPhoneNumber = elRegisterForm.querySelector(".js-user-phone-number");
const elRegisterEmail = elRegisterForm.querySelector(".js-user-email");
const elRegisterPassword = elRegisterForm.querySelector(".js-user-password");

async function userRegister() {
  try {
    const response = await fetch("http://10.40.13.28:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: elRegisterUsername.value.trim(),
        phone: elRegisterPhoneNumber.value.trim(),
        email: elRegisterEmail.value.trim(),
        password: elRegisterPassword.value
      })
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

elRegisterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userRegister();
});