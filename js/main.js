class ComponenteGTI {
    constructor(id, nombre, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }
}

const inventarioGTI = [
    new ComponenteGTI(1, "Kit K04 Turbo Hybrid", "Motor", 1200),
    new ComponenteGTI(2, "Escape Downpipe 3\"", "Escape", 450),
    new ComponenteGTI(3, "Bobinas Audi R8", "Encendido", 250),
    new ComponenteGTI(4, "Admisión Directa Carbono", "Admisión", 380)
];

const contenedorInventario = document.getElementById("contenedorInventario");
const formComponente = document.getElementById("formComponente");
const inputBusqueda = document.getElementById("inputBusqueda");
const feedbackMensaje = document.getElementById("feedbackMensaje");

function mostrarFeedback(mensaje) {
    feedbackMensaje.textContent = mensaje;
    feedbackMensaje.className = "feedback-activo";
    
    setTimeout(() => {
        feedbackMensaje.className = "feedback-oculto";
    }, 3000);
}

function renderizarInventario(lista) {
    contenedorInventario.innerHTML = "";

    if (lista.length === 0) {
        contenedorInventario.innerHTML = `<p style="color: #888;">No se encontraron componentes en el inventario.</p>`;
        return;
    }

    lista.forEach(componente => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "card-componente";
        
        tarjeta.innerHTML = `
            <div>
                <h3>${componente.nombre}</h3>
                <p>Categoría: <strong>${componente.categoria}</strong></p>
                <p class="precio">$${componente.precio.toLocaleString()}</p>
            </div>
            <button class="btn-eliminar" data-id="${componente.id}">Eliminar</button>
        `;

        contenedorInventario.appendChild(tarjeta);
    });

    activarBotonesEliminar();
}

formComponente.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const precio = Number(document.getElementById("precio").value);


    const nuevoId = inventarioGTI.length > 0 ? inventarioGTI[inventarioGTI.length - 1].id + 1 : 1;

    const nuevoComponente = new ComponenteGTI(nuevoId, nombre, categoria, precio);
    
    
    inventarioGTI.push(nuevoComponente);

    renderizarInventario(inventarioGTI);

    mostrarFeedback(`¡Componente "${nombre}" agregado con éxito al GTI!`);
    formComponente.reset();
});

function activarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const idBuscado = Number(e.target.getAttribute("data-id"));
            const indice = inventarioGTI.findIndex(item => item.id === idBuscado);

            if (indice !== -1) {
                const nombreEliminado = inventarioGTI[indice].nombre;
                inventarioGTI.splice(indice, 1);
                
                // Repintamos la lista
                renderizarInventario(inventarioGTI);
                mostrarFeedback(`Se eliminó "${nombreEliminado}" del inventario.`);
            }
        });
    });
}

inputBusqueda.addEventListener("keyup", (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    
    const resultadoFiltrado = inventarioGTI.filter(componente => 
        componente.nombre.toLowerCase().includes(textoBusqueda) || 
        componente.categoria.toLowerCase().includes(textoBusqueda)
    );

    renderizarInventario(resultadoFiltrado);
});

renderizarInventario(inventarioGTI);