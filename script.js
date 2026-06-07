//////////////////////////////////////////////////////
// ECOFOOD - JAVASCRIPT PRINCIPAL
// Controla ofertas, buscador y contadores
//////////////////////////////////////////////////////

// ==============================
// LISTA DE RESTAURANTES (DATOS)
// ==============================
const restaurants = [
{
name: "Pizzería Roma",
price: "4€ pack sorpresa",
img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
},
{
name: "Panadería Sol",
price: "3€ bollería",
img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
},
{
name: "Sushi House",
price: "5€ sushi pack",
img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
}
];


// ==============================
// FUNCION PARA MOSTRAR OFERTAS
// ==============================
function render(data) {

    // contenedor donde se muestran las tarjetas
    const container = document.getElementById("offersContainer");

    // limpiar contenido anterior
    container.innerHTML = "";

    // crear cada tarjeta de restaurante
    data.forEach(r => {

        const div = document.createElement("div");
        div.className = "offer";

        // contenido de la tarjeta
        div.innerHTML = `
            <img src="${r.img}" alt="${r.name}">
            <h3>${r.name}</h3>
            <p>${r.price}</p>
        `;

        // click en tarjeta = simulación de reserva
        div.addEventListener("click", () => {
            alert("Reserva realizada en: " + r.name);
        });

        // añadir al DOM
        container.appendChild(div);
    });
}


// ==============================
// MOSTRAR TODAS LAS OFERTAS AL INICIO
// ==============================
render(restaurants);


// ==============================
// BUSCADOR DE RESTAURANTES
// ==============================
document.getElementById("search").addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    // filtrar según nombre
    const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(value)
    );

    // volver a renderizar resultados filtrados
    render(filtered);
});


// ==============================
// CONTADORES ANIMADOS
// ==============================
function counter(id, max) {

    const element = document.getElementById(id);
    let i = 0;

    const interval = setInterval(() => {

        i++;
        element.textContent = i;

        if (i >= max) {
            clearInterval(interval);
        }

    }, 20);
}


// activar contadores
counter("food", 40000);
counter("co2", 18000);
counter("users", 15000);


// ==============================
// SCROLL SUAVE AL BOTÓN HERO
// ==============================
const btn = document.getElementById("btnScroll");

if (btn) {
    btn.addEventListener("click", () => {
        document.getElementById("offers")
        .scrollIntoView({ behavior: "smooth" });
    });
}
