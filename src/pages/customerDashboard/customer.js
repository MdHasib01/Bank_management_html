const userData = JSON.parse(localStorage.getItem("user"));
const customerName = document.getElementById("customer_name");
customerName.textContent = userData.name;
const balance = document.getElementById("balance");
balance.textContent = userData.balance;
