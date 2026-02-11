// Tässä scriptissä on hyödynnetty tekoälyä ruokalistan luomiseen
// Js ei oo meikälle vielä ihan tuttua

export function initFoodMenu() {

    const button = document.getElementById("food-btn");
    const menuContainer = document.getElementById("menuContainer");

    if (!button || !menuContainer) return;

    button.addEventListener("click", () => {
        generateMenu(menuContainer);
    });
}

function generateMenu(menuContainer) {
    menuContainer.innerHTML = "";

    const days = [
        "Maanantai",
        "Tiistai",
        "Keskiviikko",
        "Torstai",
        "Perjantai",
        "Lauantai",
        "Sunnuntai"
    ];

    const breakfast = "Kaurapuuro ja marjat";
    const lunch = "Kana ja riisi";
    const dinner = "Lohisalaatti";

    days.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        dayDiv.innerHTML = `
            <h3>${day}</h3>
            <p><strong>Aamupala:</strong> ${breakfast}</p>
            <p><strong>Lounas:</strong> ${lunch}</p>
            <p><strong>Päivällinen:</strong> ${dinner}</p>
        `;

        menuContainer.appendChild(dayDiv);
    });
}
