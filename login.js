import axios from "axios";

document.getElementById("login").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);

  axios
    .post("http://localhost/api/login/", {
      phone: formData.get("phone"),
      password: formData.get("password"),
    })
    .then(function (response) {
      console.log(response);
      // Saveing the response in local storage
      localStorage.setItem("user", JSON.stringify(response.data));
      // show wrong password or phone number alert
      if (!response.data) {
        alert("Wrong password or phone number!");
      } else {
        alert("Login successfull!");
      }
      // check the role
      if (response.data.role === "admin") {
        window.location.href =
          "http://localhost:5173/src/pages/admin/admin.html";
      } else if (response.data.role === "customer") {
        window.location.href =
          "http://localhost:5173/src/pages/customerDashboard/customer.html";
      }
    })
    .catch(function (error) {
      console.error(error);
      alert("Wrong password or phone number!");
    });
});
