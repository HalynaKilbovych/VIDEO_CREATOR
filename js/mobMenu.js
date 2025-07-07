
document.addEventListener("DOMContentLoaded", function () {
const link = document.querySelector(".header__link--work");

if (window.innerWidth <= 1200) { 
link.setAttribute("href", "#work-mob");
} else {
link.setAttribute("href", "#work");
}

window.addEventListener("resize", function () {
if (window.innerWidth <= 1200) {
    link.setAttribute("href", "#work-mob");
} else {
    link.setAttribute("href", "#work");
}
});
});
