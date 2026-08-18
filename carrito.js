// ==============================
// OBTENER CARRITO
// ==============================

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

}


// ==============================
// GUARDAR CARRITO
// ==============================

function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// ==============================
// MOSTRAR CARRITO
// ==============================

function mostrarCarrito() {

    const carrito = obtenerCarrito();

    const contenedor =
        document.getElementById("listaCarrito");


    contenedor.innerHTML = "";


    // Si está vacío

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="text-center py-5">

                <i
                    class="bi bi-cart-x"
                    style="font-size: 60px;"
                ></i>

                <h3 class="mt-3">
                    Tu carrito está vacío
                </h3>

                <p class="text-muted">
                    Agrega algunos productos para comenzar.
                </p>

                <a
                    href="index.html"
                    class="btn btn-dark"
                >
                    Comprar ahora
                </a>

            </div>

        `;

        actualizarTotales();

        return;
    }


    // Mostrar productos

    carrito.forEach(producto => {

        const totalProducto =
            producto.precio * producto.cantidad;


        contenedor.innerHTML += `

            <div class="card mb-3 shadow-sm">

                <div class="card-body">

                    <div class="row align-items-center">


                        <!-- IMAGEN -->

                        <div class="col-4 col-md-2">

                            <img
                                src="${producto.imagen}"
                                alt="${producto.nombre}"
                                class="img-fluid rounded"
                            >

                        </div>


                        <!-- INFORMACIÓN -->

                        <div class="col-8 col-md-4">

                            <h5>
                                ${producto.nombre}
                            </h5>

                            <p class="mb-0">
                                $${producto.precio.toFixed(2)}
                            </p>

                        </div>


                        <!-- CANTIDAD -->

                        <div class="col-6 col-md-3 mt-3 mt-md-0">

                            <div class="d-flex align-items-center">

                                <button
                                    class="btn btn-outline-dark"
                                    onclick="disminuirCantidad(${producto.id})"
                                >
                                    −
                                </button>


                                <span class="mx-3">
                                    ${producto.cantidad}
                                </span>


                                <button
                                    class="btn btn-outline-dark"
                                    onclick="aumentarCantidad(${producto.id})"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <!-- TOTAL -->

                        <div class="col-4 col-md-2 mt-3 mt-md-0">

                            <strong>
                                $${totalProducto.toFixed(2)}
                            </strong>

                        </div>


                        <!-- ELIMINAR -->

                        <div class="col-2 col-md-1 mt-3 mt-md-0">

                            <button
                                class="btn btn-danger"
                                onclick="eliminarProducto(${producto.id})"
                            >
                                <i class="bi bi-trash"></i>
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });


    actualizarTotales();

    actualizarContador();

}


// ==============================
// AUMENTAR CANTIDAD
// ==============================

function aumentarCantidad(id) {

    const carrito = obtenerCarrito();

    const producto =
        carrito.find(p => p.id === id);


    if (producto) {

        producto.cantidad++;

    }


    guardarCarrito(carrito);

    mostrarCarrito();

}


// ==============================
// DISMINUIR CANTIDAD
// ==============================

function disminuirCantidad(id) {

    const carrito = obtenerCarrito();

    const producto =
        carrito.find(p => p.id === id);


    if (!producto) {
        return;
    }


    producto.cantidad--;


    // Si llega a cero lo eliminamos

    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;

    }


    guardarCarrito(carrito);

    mostrarCarrito();

}


// ==============================
// ELIMINAR PRODUCTO
// ==============================

function eliminarProducto(id) {

    let carrito = obtenerCarrito();


    carrito = carrito.filter(
        producto => producto.id !== id
    );


    guardarCarrito(carrito);

    mostrarCarrito();

}


// ==============================
// CALCULAR TOTALES
// ==============================

function actualizarTotales() {

    const carrito = obtenerCarrito();


    let subtotal = 0;


    carrito.forEach(producto => {

        subtotal +=
            producto.precio *
            producto.cantidad;

    });


    // Envío gratis por ahora

    const envio = 0;

    const total = subtotal + envio;


    document.getElementById("subtotal")
        .textContent = subtotal.toFixed(2);


    document.getElementById("envio")
        .textContent = envio.toFixed(2);


    document.getElementById("total")
        .textContent = total.toFixed(2);

}


// ==============================
// CONTADOR DEL CARRITO
// ==============================

function actualizarContador() {

    const carrito = obtenerCarrito();


    const cantidad = carrito.reduce(
        (total, producto) =>
            total + producto.cantidad,
        0
    );


    const contador =
        document.getElementById(
            "contadorCarrito"
        );


    if (contador) {

        contador.textContent = cantidad;

    }

}


// ==============================
// BOTÓN COMPRAR
// ==============================

document
    .getElementById("btnComprar")
    .addEventListener("click", function () {

        const carrito = obtenerCarrito();


        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }


        alert(
            "¡Gracias por tu compra! 🛒"
        );

    });


// ==============================
// INICIAR
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        mostrarCarrito();

        actualizarContador();

    }
);