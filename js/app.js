const stockProductos = [
  {
    id: 1,
    nombre: "Call of duty",
    cantidad: 1,
    desc: "Disparos",
    precio: 1200,
    img: "img/COD-WWII.jpg",
  },
  {
    id: 2,
    nombre: "Mortal Kombat 11",
    cantidad: 1,
    desc: "Lucha",
    precio: 1500,
    img: "img/mortal-kombat.jpg",
  },
  {
    id: 3,
    nombre: "Dirt 5",
    cantidad: 1,
    desc: "Conduccion",
    precio: 1570,
    img: "img/Dirt5.jpg",
  },
  {
    id: 4,
    nombre: "Forza horizon 5",
    cantidad: 1,
    desc: "Conduccion",
    precio: 1000,
    img: "img/FORZAHORIZON5.png",
  },
  {
    id: 5,
    nombre: "Ghostwire",
    cantidad: 1,
    desc: "Accion",
    precio: 1200,
    img: "img/Ghostwire.jpg",
  },
  {
    id: 6,
    nombre: "Riders republic",
    cantidad: 1,
    desc: "Deporte",
    precio: 1200,
    img: "img/riders-republic.jpg",
  },
  {
    id: 7,
    nombre: "State of decay",
    cantidad: 1,
    desc: "Accion",
    precio: 1400,
    img: "img/stateofdecay.png",
  },
  {
    id: 8,
    nombre: "Stray",
    cantidad: 1,
    desc: "Aventuras",
    precio: 1200,
    img: "img/STRAY.png",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarrito();
});

vaciarCarrito.addEventListener("click", () => {
  carrito.length = [];
  mostrarCarrito();
});


const pedidofethc = () => {
  let pedido = fetch('ruta')

  .then(resp =>{
    resp.json()
    stockProductos.push(resp)
  })
  
}

procesarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "¡Tu carrito está vacio!",
      text: "Compra algo para continuar con la compra",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    location.href = "./pages/compra.html";
  }
});

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-2 mx-auto" style="width: 18rem;">
    <img class="card-img-top m-lg-2 mt-2 h-100" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, img, cantidad } = prod;
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="./${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  }
  carritoContenedor.textContent = carrito.length;

    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
 

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="./${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  
  totalProceso.innerText = [
    ...carrito,
    carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0),
  ];
}
