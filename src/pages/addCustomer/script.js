import axios from "axios";

document.getElementById("signup").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData(this);
  axios
    .post("http://localhost/api/", {
      name: formData.get("name"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      role: "customer",
      age: formData.get("age"),
      gender: formData.get("gender"),
      email: formData.get("email"),
      address: formData.get("address"),
    })
    .then(function (response) {
      console.log(response);
      alert("Data successfully submitted!");

      window.location.href = "../customerList/index.html";
    })
    .catch(function (error) {
      console.error(error);
      alert("Error occurred while submitting data!");
    });
});
const roleSelect = document.getElementById("role");
const customerFields = document.getElementById("customerFields");

roleSelect.addEventListener("change", () => {
  if (roleSelect.value === "customer") {
    customerFields.style.display = "block";
  } else {
    customerFields.style.display = "none";
  }
});
