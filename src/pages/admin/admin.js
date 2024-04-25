const userData = JSON.parse(localStorage.getItem("user"));
const adminName = document.getElementById("admin");
adminName.textContent = `(${userData.name})`;
