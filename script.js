/* =========================================
   ECOFOOD - SCRIPT PRINCIPAL
   App simulada completa (nivell alt)
========================================= */

/* =========================
   ESTAT GLOBAL
========================= */

let currentScreen = "splash";
let selectedOffer = null;
let quantity = 1;

let user = {
    name: "",
    email: "",
    favorites: [],
    reservations: [],
    stats: {
        food: 0,
        co2: 0,
        money: 0
    }
};

/* =========================
   DADES SIMULADES (100 OFERTES)
========================= */

const offers = Array.from({ length: 100 }, (_, i) => {
    const types = ["Restaurant", "Fleca", "Supermercat"];
    const names = ["EcoFood", "Green Bite", "Food Save", "Fresh Deal", "Zero Waste Spot"];

    return {
        id: i,
        name: `${names[i % names.length]} ${i + 1}`,
        type: types[i % 3],
        description: "Lot de menjar d'alta qualitat amb descompte.",
        price: (Math.random() * 10 + 2).toFixed(2),
        image: "https://via.placeholder.com/300x200?text=EcoFood"
    };
});

/* =========================
   INICI
========================= */

document.addEventListener("DOMContentLoaded", () => {

    showScreen("splash");

    document.getElementById("startApp").onclick = () => {
        showScreen("onboarding");
    };

    document.getElementById("goLogin").onclick = () => {
        showScreen("login");
    };

    setupAuth();
    setupLocation();
    setupHome();
    setupOfferDetail();
    setupQuantity();
    setupPayment();
    setupBottomNav();
    setupSettings();
});

/* =========================
   CANVI DE PANTALLA
========================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active-screen");
    });

    document.getElementById(id).classList.add("active-screen");

    currentScreen = id;
}

/* =========================
   LOGIN / REGISTER
========================= */

function setupAuth() {

    document.getElementById("loginBtn").onclick = () => {
        const email = document.getElementById("loginEmail").value;
        const pass = document.getElementById("loginPassword").value;

        if (email && pass) {
            user.email = email;
            showScreen("location");
        }
    };

    document.getElementById("openRegister").onclick = () => {
        showScreen("register");
    };

    document.getElementById("registerBtn").onclick = () => {
        const name = document.getElementById("registerName").value;

        user.name = name;

        showScreen("login");
    };
}

/* =========================
   UBICACIÓ SIMULADA
========================= */

function setupLocation() {

    document.getElementById("allowLocation").onclick = () => {
        showScreen("home");
        renderOffers(offers);
    };
}

/* =========================
   HOME + OFERTES
========================= */

function setupHome() {

    const search = document.getElementById("searchInput");

    search.addEventListener("input", () => {
        const value = search.value.toLowerCase();

        const filtered = offers.filter(o =>
            o.name.toLowerCase().includes(value)
        );

        renderOffers(filtered);
    });

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.onclick = () => {

            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active-filter"));

            btn.classList.add("active-filter");

            const type = btn.textContent.trim();

            if (type === "Tots") {
                renderOffers(offers);
            } else {
                renderOffers(offers.filter(o => o.type === type));
            }
        };
    });
}

/* Render d'ofertes */

function renderOffers(data) {

    const container = document.getElementById("offersContainer");

    container.innerHTML = "";

    data.slice(0, 20).forEach(offer => {

        const div = document.createElement("div");
        div.className = "offer-card";

        div.innerHTML = `
            <img src="${offer.image}">
            <h4>${offer.name}</h4>
            <p>${offer.price} €</p>
            <button>Veure</button>
        `;

        div.querySelector("button").onclick = () => {
            openOffer(offer);
        };

        container.appendChild(div);
    });
}

/* =========================
   DETALL OFERTA
========================= */

function setupOfferDetail() {

    document.querySelector("#offerDetail .backBtn").onclick = () => {
        showScreen("home");
    };

    document.getElementById("reserveNow").onclick = () => {
        showScreen("quantity");
    };
}

function openOffer(offer) {

    selectedOffer = offer;

    document.getElementById("detailImage").src = offer.image;
    document.getElementById("detailName").textContent = offer.name;
    document.getElementById("detailDescription").textContent = offer.description;
    document.getElementById("detailPrice").textContent = offer.price + " €";

    showScreen("offerDetail");
}

/* =========================
   QUANTITAT
========================= */

function setupQuantity() {

    document.getElementById("minusBtn").onclick = () => {
        if (quantity > 1) quantity--;
        updateQuantity();
    };

    document.getElementById("plusBtn").onclick = () => {
        quantity++;
        updateQuantity();
    };

    document.getElementById("continuePayment").onclick = () => {
        renderPayment();
        showScreen("payment");
    };
}

function updateQuantity() {
    document.getElementById("quantityValue").textContent = quantity;
}

/* =========================
   PAGAMENT
========================= */

function setupPayment() {

    document.getElementById("payNow").onclick = () => {

        const reservation = {
            ...selectedOffer,
            quantity,
            date: new Date().toLocaleString()
        };

        user.reservations.push(reservation);

        user.stats.food += quantity * 0.5;
        user.stats.co2 += quantity * 1.2;
        user.stats.money += quantity * parseFloat(selectedOffer.price);

        quantity = 1;

        showScreen("confirmation");
    };

    document.getElementById("goReservations").onclick = () => {
        renderReservations();
        showScreen("reservations");
    };
}

function renderPayment() {

    const container = document.getElementById("paymentSummary");

    container.innerHTML = `
        <p><b>${selectedOffer.name}</b></p>
        <p>Quantitat: ${quantity}</p>
        <p>Total: ${(selectedOffer.price * quantity).toFixed(2)} €</p>
    `;
}

/* =========================
   RESERVES
========================= */

function renderReservations() {

    const container = document.getElementById("reservationsContainer");

    container.innerHTML = "";

    user.reservations.forEach(r => {

        const div = document.createElement("div");

        div.className = "reservation-card";

        div.innerHTML = `
            <h4>${r.name}</h4>
            <p>Quantitat: ${r.quantity}</p>
            <p>${r.date}</p>
        `;

        container.appendChild(div);
    });
}

/* =========================
   FAVORITS
========================= */

function toggleFavorite(offer) {

    const index = user.favorites.findIndex(f => f.id === offer.id);

    if (index === -1) {
        user.favorites.push(offer);
    } else {
        user.favorites.splice(index, 1);
    }
}

/* =========================
   BOTTOM NAV
========================= */

function setupBottomNav() {

    document.querySelectorAll(".bottom-nav button").forEach(btn => {

        btn.onclick = () => {

            const screen = btn.dataset.screen;

            if (screen === "reservations") renderReservations();
            if (screen === "favorites") renderFavorites();
            if (screen === "profile") renderStats();

            showScreen(screen);
        };
    });
}

/* =========================
   FAVORITS
========================= */

function renderFavorites() {

    const container = document.getElementById("favoritesContainer");

    container.innerHTML = "";

    user.favorites.forEach(f => {

        const div = document.createElement("div");

        div.className = "favorite-card";

        div.innerHTML = `
            <h4>${f.name}</h4>
            <p>${f.price} €</p>
        `;

        container.appendChild(div);
    });
}

/* =========================
   ESTADÍSTIQUES
========================= */

function renderStats() {

    document.getElementById("foodSaved").textContent =
        user.stats.food.toFixed(1) + " kg";

    document.getElementById("co2Saved").textContent =
        user.stats.co2.toFixed(1) + " kg";

    document.getElementById("moneySaved").textContent =
        user.stats.money.toFixed(2) + " €";
}

/* =========================
   AJUSTOS
========================= */

function setupSettings() {

    const darkToggle = document.getElementById("darkModeToggle");

    darkToggle.onchange = () => {
        document.body.classList.toggle("dark-mode");
    };
}
