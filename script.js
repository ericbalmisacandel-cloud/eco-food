
/* =========================================
   ECOFOOD - SCRIPT PRO (MEJOR VISUAL)
========================================= */

/* =========================
   ESTADO GLOBAL
========================= */

let currentScreen = "splash";
let selectedOffer = null;
let quantity = 1;

let user = {
    favorites: [],
    reservations: [],
    stats: {
        food: 0,
        co2: 0,
        money: 0
    }
};

/* =========================
   IMÁGENES REALES
========================= */

const images = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    "https://images.unsplash.com/photo-1550547660-d9450f859349"
];

/* =========================
   DADES OFERTES (MEJORADAS)
========================= */

const offers = Array.from({ length: 100 }, (_, i) => {

    const types = ["Restaurant", "Fleca", "Supermercat"];

    const names = [
        "EcoFood",
        "Green Bite",
        "Fresh Save",
        "Zero Waste",
        "Food Rescue"
    ];

    const type = types[i % types.length];

    return {
        id: i,
        name: `${names[i % names.length]} ${i + 1}`,
        type: type,
        description: "Lot sorpresa de menjar d'alta qualitat amb descompte.",
        price: (Math.random() * 10 + 2).toFixed(2),
        image: images[i % images.length],
        color:
            type === "Restaurant"
                ? "#ff6b6b"
                : type === "Fleca"
                ? "#feca57"
                : "#1dd1a1"
    };
});

/* =========================
   INICI
========================= */

document.addEventListener("DOMContentLoaded", () => {

    showScreen("splash");

    document.getElementById("startApp").onclick = () => showScreen("onboarding");
    document.getElementById("goLogin").onclick = () => showScreen("login");

    setupAuth();
    setupLocation();
    setupHome();
    setupOfferDetail();
    setupQuantity();
    setupPayment();
    setupBottomNav();
});

/* =========================
   CAMBIO DE PANTALLA
========================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active-screen");
    });

    document.getElementById(id).classList.add("active-screen");

    currentScreen = id;
}

/* =========================
   AUTH SIMULADO
========================= */

function setupAuth() {

    document.getElementById("loginBtn").onclick = () => {
        showScreen("location");
    };

    document.getElementById("registerBtn").onclick = () => {
        showScreen("login");
    };
}

/* =========================
   UBICACIÓN
========================= */

function setupLocation() {
    document.getElementById("allowLocation").onclick = () => {
        showScreen("home");
        renderOffers(offers);
    };
}

/* =========================
   HOME + BUSCADOR + FILTROS
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

/* =========================
   RENDER OFERTES (MEJOR VISUAL)
========================= */

function renderOffers(data) {

    const container = document.getElementById("offersContainer");
    container.innerHTML = "";

    data.slice(0, 20).forEach(offer => {

        const div = document.createElement("div");
        div.className = "offer-card";

        div.style.borderLeft = `6px solid ${offer.color}`;

        div.innerHTML = `
            <div style="position:relative">
                <img src="${offer.image}" style="width:100%; border-radius:10px;">
                <span style="
                    position:absolute;
                    top:10px;
                    left:10px;
                    background:${offer.color};
                    color:white;
                    padding:5px 10px;
                    border-radius:20px;
                    font-size:12px;
                ">
                    ${offer.type}
                </span>
            </div>

            <h4 style="margin-top:10px">${offer.name}</h4>

            <p style="opacity:0.7">${offer.description}</p>

            <p style="font-weight:bold">${offer.price} €</p>

            <button>Veure oferta</button>
        `;

        div.querySelector("button").onclick = () => openOffer(offer);

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
        document.getElementById("quantityValue").textContent = quantity;
    };

    document.getElementById("plusBtn").onclick = () => {
        quantity++;
        document.getElementById("quantityValue").textContent = quantity;
    };

    document.getElementById("continuePayment").onclick = () => {
        renderPayment();
        showScreen("payment");
    };
}

/* =========================
   PAGAMENT
========================= */

function setupPayment() {

    document.getElementById("payNow").onclick = () => {

        user.reservations.push({
            ...selectedOffer,
            quantity,
            date: new Date().toLocaleString()
        });

        user.stats.food += quantity * 0.5;
        user.stats.co2 += quantity * 1.2;
        user.stats.money += quantity * selectedOffer.price;

        quantity = 1;

        showScreen("confirmation");
    };

    document.getElementById("goReservations").onclick = () => {
        renderReservations();
        showScreen("reservations");
    };
}

function renderPayment() {

    document.getElementById("paymentSummary").innerHTML = `
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
   NAV INFERIOR
========================= */

function setupBottomNav() {

    document.querySelectorAll(".bottom-nav button").forEach(btn => {

        btn.onclick = () => {

            const screen = btn.dataset.screen;

            if (screen === "reservations") renderReservations();
            if (screen === "favorites") renderFavorites();

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
