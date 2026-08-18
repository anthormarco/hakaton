let productoSeleccionado = null;

const productos = [

    {
        id: 1,

        nombre: "Playera Gear Sport",

        precio: 599,

        imagen: "img/playera.jpg",

        descripcion:
            "Playera deportiva diseñada para ofrecer comodidad y libertad de movimiento durante tus entrenamientos.",

        caracteristicas: [
            "Tela transpirable",
            "Secado rápido",
            "Diseño deportivo",
            "Disponible en varias tallas"
        ]
    },


    {
        id: 2,

        nombre: "Short Deportivo",

        precio: 499,

        imagen: "img/short.jpg",

        descripcion:
            "Short ligero y cómodo para entrenamiento, gimnasio y actividades deportivas.",

        caracteristicas: [
            "Material ligero",
            "Bolsillos laterales",
            "Cintura ajustable",
            "Tela transpirable"
        ]
    }

];
// ==========================
// MOSTRAR PRODUCTO
// ==========================

function mostrarProducto(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return;
    }

    productoSeleccionado = producto;

    document.getElementById("modalNombre").textContent = producto.nombre;

    document.getElementById("modalPrecio").textContent =
        `$${producto.precio.toFixed(2)}`;

    document.getElementById("modalDescripcion").textContent =
        producto.descripcion;

    document.getElementById("modalImagen").src =
        producto.imagen;

    document.getElementById("modalImagen").alt =
        producto.nombre;


    // Características

    const lista = document.getElementById("modalCaracteristicas");

    lista.innerHTML = "";

    producto.caracteristicas.forEach(caracteristica => {

        const li = document.createElement("li");

        li.textContent = caracteristica;

        lista.appendChild(li);

    });


    // Reiniciar cantidad

    document.getElementById("cantidadProducto").value = 1;
}



// ==========================
// OBTENER CARRITO
// ==========================

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

}



// ==========================
// GUARDAR CARRITO
// ==========================

function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}



// ==========================
// AGREGAR AL CARRITO
// ==========================

document
    .getElementById("btnAgregarModal")
    .addEventListener("click", function () {

        if (!productoSeleccionado) {
            return;
        }

        const cantidad = parseInt(
            document.getElementById("cantidadProducto").value
        );


        if (cantidad < 1) {
            alert("La cantidad debe ser mayor a 0");
            return;
        }


        const carrito = obtenerCarrito();


        const productoExistente =
            carrito.find(
                producto =>
                    producto.id === productoSeleccionado.id
            );


        if (productoExistente) {

            productoExistente.cantidad += cantidad;

        } else {

            carrito.push({

                id: productoSeleccionado.id,

                nombre: productoSeleccionado.nombre,

                precio: productoSeleccionado.precio,

                imagen: productoSeleccionado.imagen,

                cantidad: cantidad

            });

        }


        guardarCarrito(carrito);

        actualizarContadorCarrito();


        alert("Producto agregado al carrito 🛒");


        // Cerrar modal

        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById("productoModal")
            );

        modal.hide();

    });



// ==========================
// CONTADOR DEL CARRITO
// ==========================

function actualizarContadorCarrito() {

    const carrito = obtenerCarrito();

    const cantidad = carrito.reduce(
        (total, producto) =>
            total + producto.cantidad,
        0
    );


    const contador =
        document.getElementById("contadorCarrito");


    if (contador) {

        contador.textContent = cantidad;

    }

}



// ==========================
// AL CARGAR LA PÁGINA
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        actualizarContadorCarrito();

    }
);

