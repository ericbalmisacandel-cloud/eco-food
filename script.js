
// =====================================
// GENERADOR DE 100 RESTAURANTES
// =====================================

const names = [
"Pizzería Roma","Panadería Sol","Sushi House","Burger King Local",
"Taco Express","Kebab Center","Poke Bowl","Healthy Food",
"Pizza Express","Noodle Bar"
];

const restaurants = [];

// crear 100 restaurantes automáticamente
for (let i = 1; i <= 100; i++) {

    const base = names[Math.floor(Math.random() * names.length)];

    restaurants.push({
        name: base + " " + i,
        price: (Math.floor(Math.random() * 6) + 3) + "€ oferta",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    });
}


// =====================================
// MOSTRAR RESTAURANTES
// =====================================

function render(data) {

    const container = document.getElementById("offersContainer");
    container.innerHTML = "";

    data.forEach(r => {

        const div = document.createElement("div");
        div.className = "offer";

        div.innerHTML = `
            <img src="${r.img}">
            <h3>${r.name}</h3>
            <p>${r.price}</p>
        `;

        div.onclick = () => {
            alert("Has reservado en: " + r.name);
        };

        container.appendChild(div);
    });
}


// mostrar todos al inicio
render(restaurants);


// =====================================
// BUSCADOR
// =====================================

document.getElementById("search").addEventListener("input", e => {

    const value = e.target.value.toLowerCase();

    const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(value)
    );

    render(filtered);
});


// =====================================
// CONTADORES ANIMADOS
// =====================================

function counter(id, max) {

    let el = document.getElementById(id);
    let i = 0;

    let interval = setInterval(() => {
        i++;
        el.textContent = i;

        if (i >= max) clearInterval(interval);

    }, 20);
}

counter("food", 40000);
counter("co2", 18000);
counter("users", 15000);


// =====================================
// BOTÓN SCROLL
// =====================================

document.getElementById("btnScroll").addEventListener("click", () => {
    document.getElementById("offers").scrollIntoView({ behavior: "smooth" });
});
