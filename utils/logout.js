//get element by id
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../login/login.html";
})