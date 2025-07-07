document.addEventListener("DOMContentLoaded", () => {
    document.body.click();
    document.querySelectorAll("video").forEach(v => v.play());
    document.addEventListener("click", () => document.querySelectorAll("video").forEach(v => v.play()), { once: true });

    setTimeout(() => {
        const p = document.querySelector("#preloader");
        p.classList.add("preloaded");
        setTimeout(() => p.remove(), 200);
    }, 3000);

    const link = document.querySelector(".header__link--work"),
        setLink = () => link.setAttribute("href", window.innerWidth <= 1200 ? "#work-mob" : "#work");

    setLink();
    window.addEventListener("resize", setLink);

    function initDraggableSlider() {
        const wrap = document.querySelector(".scroll__wrap"),
            cont = wrap?.parentElement;
        if (!wrap || !cont) return;

        gsap.registerPlugin(Draggable, ScrollToPlugin);
        let lastX = 0, v = 0, d = Draggable.create(wrap, {
            type: "x", bounds: { minX: -(wrap.scrollWidth - cont.clientWidth), maxX: 0 }, edgeResistance: .8, cursor: "grab",
            onPress() { gsap.killTweensOf(wrap); this.startX = this.x; this.target.style.cursor = "grabbing"; lastX = this.x; },
            onDrag() { v = this.x - lastX; lastX = this.x; },
            onRelease() { this.target.style.cursor = "grab"; applyInertia(this.x, v); }
        })[0];

        function applyInertia(s, v) {
            gsap.to(wrap, { x: Math.max(Math.min(s + v * 10, 0), -(wrap.scrollWidth - cont.clientWidth)), duration: 1.5, ease: "power2.out", onUpdate: () => d.update() });
        }

        let sv = 0, scrolling = false;
        function smoothScroll() {
            if (Math.abs(sv) > .1) {
                gsap.to(wrap, { x: Math.max(Math.min(parseFloat(gsap.getProperty(wrap, "x")) + sv, 0), -(wrap.scrollWidth - cont.clientWidth)), duration: .5, ease: "power2.out", onUpdate: () => d.update() });
                sv *= .9; requestAnimationFrame(smoothScroll);
            } else scrolling = false;
        }

        cont.addEventListener("wheel", e => {
            e.preventDefault();
            sv += (e.deltaY || e.detail || -e.wheelDelta) * -.5;
            if (!scrolling) scrolling = true, smoothScroll();
        });
    }
    setTimeout(initDraggableSlider, 0);

    ["scroll-button-down", "scroll-button-up", "scroll-button-down--desk", "scroll-button-up--desk"].forEach(cls => {
        document.querySelector(`.${cls}`).addEventListener("click", () => {
            document.querySelector(cls.includes("down") ? ".next-section" : ".prev-section").scrollIntoView({ behavior: "smooth" });
        });
    });
});