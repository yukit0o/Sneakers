const main = document.querySelector("main");

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("fade-out");

    // Reflow pour forcer l’animation à bien se lancer
    requestAnimationFrame(() => {
        setTimeout(() => {
            main.classList.add("fade-in");
        }, 50);
    });
});

const navLinks = document.querySelectorAll(".nav-links a[href]");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        if (href.startsWith("#")) return;

        e.preventDefault();
        document.body.classList.add("fade-out");
        main.classList.remove("fade-in");

        setTimeout(() => {
            window.location.href = href;
        }, 500); // durée synchronisée avec le CSS
    });
});