
document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");

    document.body.click(); 

    videos.forEach(video => video.play());

    document.addEventListener("click", () => {
        videos.forEach(video => video.play());
    }, { once: true });
});