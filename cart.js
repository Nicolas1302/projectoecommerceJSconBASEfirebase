




const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
let cantidadProductos = document.getElementById("cantidadProducto")



const mostrarCarrito = () => {                  /*se crea el carrito */
    modalContainer.innerHTML = ""               /*limpio el carrito */
    modalContainer.style.display = "flex";       /*le doy un display para que se vea */
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>`
    modalContainer.append(modalHeader);

    const modalbuttom = document.createElement("div") /*se crea el boton para cerrar el carrito */
    modalbuttom.innerText = "x";
    modalbuttom.className = "modal-header-button";

    modalbuttom.addEventListener("click",() => {
        modalContainer.style.display = "none";   /*para cerrar el display del carrito */

    })

    modalHeader.append(modalbuttom);

    cartProducts.forEach((products) => {
        let carritoConten = document.createElement("div");
        carritoConten.className = "modal-content";
        carritoConten.innerHTML =`
                            <img src="${products.img}" alt="">
                            <h3>${products.nombre}</h3>
                            <p>$${products.precio}</p>
                            
                            <p><span class="restar">➖</span>cantidad:<span class="cartCartidad">${products.cantidad}</span><span class="sumar">➕</span></p>
                            
                            <p>total:${products.cantidad*products.precio}</p>
                            <span class="delete-product">❌</span>`;
        modalContainer.append(carritoConten);

        /*restar la cantidad en el carrito */
        let restar = carritoConten.querySelector(".restar")
        restar.addEventListener("click", () => {
            if(products.cantidad != 1){
                products.cantidad--;
            }
            saveLS() /*actualizo el localStorage */
            mostrarCarrito() /*actualizo el Carrito */
        })

        /*sumar la cantidad en el carrito */
        let sumar = carritoConten.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            if(products.cantidad >= 1){
                products.cantidad++;
            }
            saveLS()/*actualizo el localStorage */
            mostrarCarrito()  /*actualizo el Carrito */
        })

        let eliminar = carritoConten.querySelector(".delete-product")
        eliminar.addEventListener("click", () => {
            Toastify({                                                  /*se crea la notificacion del evento que elimina elementos del carrito */
                text: "Eliminaste "+[products.nombre]+" del Carrito",
                duration: 4000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to top, #ee0979, #ff6a00)",
                },
            }).showToast()
            console.log(products.id); //se prueba que id selecciona
            eliminarProducto(products.id);
        })
        
            

    })

    const total = cartProducts.reduce((acc , el) => acc + el.precio * el.cantidad, 0); /*el reduce acumula o suma el total de los productos del carrito */

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total-content";
    totalCarrito.innerHTML = `
                            <h1 class="total-content">TOTAL:$${total}</h1>`
    modalContainer.append(totalCarrito)
    
};

verCarrito.addEventListener("click", mostrarCarrito)  /*evento para Mostrar Carrito */

const eliminarProducto = (id) => {                            /*Buscamos la Id para eliminar */
    const foundId  = cartProducts.findIndex((element) => element.id === id);

    console.log(foundId);
    console.log(cartProducts);


    let newCartProducts = cartProducts.filter(cartProductsId => cartProductsId !== foundId);
    console.log(newCartProducts);
    cartProducts = [newCartProducts];
            /*filtramo y retorna los ID que son diferente al encontrado */
    
    carritoContador()
    console.log(cartProducts);
    saveLS()
    mostrarCarrito();
    /*mostramos el Carrito sin el elemento eliminado */
};

export const carritoContador = () => {     /*Muestra la cantidad de producto en el icono del Carrito */
    cantidadProductos.style.display = "block";
    const cartLength = cartProducts.length;
    console.log(cartLength)
    localStorage.setItem("cartLength", JSON.stringify(cartLength))
    cantidadProductos.innerText = JSON.parse(localStorage.getItem("cartLength"));
}



carritoContador() /*Muestra la cantidad de producto en el icono del Carrito cuando se actualiza la pagina */

