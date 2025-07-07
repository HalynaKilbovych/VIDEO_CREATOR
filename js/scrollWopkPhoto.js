document.addEventListener("DOMContentLoaded", () => {
    function initDraggableSlider() {
        const scrollWrap = document.querySelector(".scroll__wrap");
        const container = scrollWrap ? scrollWrap.parentElement : null;

        if (!scrollWrap || !container) return;

        gsap.registerPlugin(Draggable, ScrollToPlugin);

        let lastX = 0;
        let velocity = 0;


        let draggable = Draggable.create(scrollWrap, {
            type: "x",
            bounds: { minX: -(scrollWrap.scrollWidth - container.clientWidth), maxX: 0 },
            edgeResistance: 0.8,
            cursor: "grab",
            onPress() {
                gsap.killTweensOf(scrollWrap);
                this.startX = this.x;
                this.target.style.cursor = "grabbing";
                lastX = this.x;
            },
            onDrag() {
                velocity = this.x - lastX;
                lastX = this.x;
            },
            onRelease() {
                this.target.style.cursor = "grab";
                applyInertia(this.x, velocity);
            }
        })[0];

        function applyInertia(startX, velocity) {
            let distance = velocity * 10;
            gsap.to(scrollWrap, {
                x: Math.max(Math.min(startX + distance, 0), -(scrollWrap.scrollWidth - container.clientWidth)),
                duration: 1.5,
                ease: "power2.out",
                onUpdate() {
                    draggable.update();
                }
            });
        }

        let scrollVelocity = 0;
        let isScrolling = false;

        function smoothScroll() {
            if (Math.abs(scrollVelocity) > 0.1) {
                gsap.to(scrollWrap, {
                    x: Math.max(Math.min(parseFloat(gsap.getProperty(scrollWrap, "x")) + scrollVelocity, 0), -(scrollWrap.scrollWidth - container.clientWidth)),
                    duration: 0.5,
                    ease: "power2.out",
                    onUpdate() {
                        draggable.update();
                    }
                });
                scrollVelocity *= 0.9;
                requestAnimationFrame(smoothScroll);
            } else {
                isScrolling = false;
            }
        }

        container.addEventListener("wheel", (event) => {
            event.preventDefault();
            let delta = event.deltaY || event.detail || (-event.wheelDelta);
            scrollVelocity += delta * -0.5;
            if (!isScrolling) {
                isScrolling = true;
                smoothScroll();
            }
        });
    }

    setTimeout(initDraggableSlider, 0);
});