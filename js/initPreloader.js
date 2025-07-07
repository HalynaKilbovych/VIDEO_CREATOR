document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector("#preloader");

    setTimeout(() => {
        preloader.classList.add("preloaded");
        setTimeout(() => {
            preloader.remove();
        }, 200);
    }, 3000); 
});