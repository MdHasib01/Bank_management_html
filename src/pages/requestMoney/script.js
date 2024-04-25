const userData = JSON.parse(localStorage.getItem("user"));
const customerName = document.getElementById("name");
customerName.value = userData.name;
const customerEmail = document.getElementById("email");
customerEmail.value = userData.email;
const customerPhone = document.getElementById("phone");
customerPhone.value = userData.phone;
