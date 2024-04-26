import axios from "axios";

const userData = JSON.parse(localStorage.getItem("user"));
const customerName = document.getElementById("name");
customerName.value = userData.name;
const customerEmail = document.getElementById("email");
customerEmail.value = userData.email;
const customerPhone = document.getElementById("phone");
customerPhone.value = userData.phone;
const id = document.getElementById("id");
id.value = userData.id;

document
  .getElementById("request_loan")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(this);
    axios
      .post("http://localhost/api/loan/", {
        id: userData.id,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        loanAmount: formData.get("loanAmount"),
        message: formData.get("message"),
      })
      .then(function (response) {
        console.log(response);
        alert("Loan Request submited!");
      })
      .catch(function (error) {
        console.error(error);
        alert("Error occurred while submitting data!");
      });
  });
