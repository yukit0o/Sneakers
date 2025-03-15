document.addEventListener("DOMContentLoaded", function () {
    const svgContainer = document.getElementById("svg-container");
    const backgroundImage = document.getElementById("background-image");
    const svgFiles = ["1.svg", "2.svg", "3.svg"];
    let selectedSVG = null; // SVG actuellement sélectionné

    // Fonction pour charger un SVG en inline
    function loadSVG(file, id) {
        return fetch(file)
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(data, "image/svg+xml");
                let svgElement = doc.documentElement;
                svgElement.classList.add("svg-loaded");
                svgElement.setAttribute("id", id);
                return svgElement;
            })
            .catch(error => console.error("Erreur de chargement :", error));
    }

    // Ajuster la hauteur des SVG une fois l'image chargée
    backgroundImage.onload = () => {
        const imageWidth = backgroundImage.clientWidth;
        const imageHeight = backgroundImage.clientHeight;
        svgContainer.style.width = imageWidth + "px";
        svgContainer.style.height = imageHeight + "px";
    };

    // Charger les trois SVG dynamiquement avec des identifiants uniques
    Promise.all(svgFiles.map((file, index) => loadSVG(file, `svg${index + 1}`))).then(svgs => {
        svgs.forEach(svg => {
            if (svg) {
                svg.style.width = "100%";
                svg.style.height = "auto";
                svgContainer.appendChild(svg);
            }
        });

        // Sélectionne le premier SVG par défaut
        selectedSVG = document.getElementById("svg1");
        document.querySelector(`[data-target="svg1"]`).classList.add("active");
    });

    // Gérer la sélection des SVG
    const svgButtons = document.querySelectorAll(".svg-button");
    svgButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");

            // Retirer la classe active des autres boutons
            svgButtons.forEach(btn => btn.classList.remove("active"));

            // Ajouter la classe active au bouton cliqué
            this.classList.add("active");

            // Mettre à jour le SVG sélectionné
            selectedSVG = document.getElementById(targetId);
        });
    });

    // Fonction pour mettre à jour la couleur sélectionnée
    document.getElementById("color-picker").addEventListener("input", function () {
        if (!selectedSVG) return;
        let color = this.value;
        let elements = selectedSVG.querySelectorAll("path");
        elements.forEach(element => {
            element.setAttribute("fill", color);
        });
    });
});