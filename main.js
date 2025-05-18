import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
//import { carritoContador } from "./cart.js";



let cartProducts = JSON.parse(localStorage.getItem("Cart")) || []; 
/*para cuando refrescamo la pagina en el carrito muestre lo que hay en el localStorage y si no tiene nada muestra un array vacio */
let contenedor = document.getElementById("item-products")





const getProductos = async () => {      /*la promesa que toma los elemento de data.json*/
    const response = await getDocs(collection(db, "productos"));
    const datas =  response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //const data = JSON.stringify(datas);
    console.log(datas);
    //console.log(data);


    datas.forEach((producto) => {
        let contenedor1 = document.createElement("div") /* creo el Div que Contiene el Producto */
        contenedor1.className = "cartProductos" /* le agrego una clase para dar estilo */
        contenedor1.innerHTML = /*`<span>ID: ${producto.id}</span>*/
                                `<img src="${producto.image}" alt="">
                                <h3>${producto.name}</h3>
                                <h4>$${producto.price}</h4>`
        contenedor.append(contenedor1) /* inserto el producto en el DOM */
    
        
        let addButton = document.createElement("button") /* creo el Boton agregar */
        addButton.innerText = "Agregar";
        addButton.className = "productoAgregar btn btn-secondary"
    
        contenedor1.append(addButton)  /* inserto el boton en el producto */
    
        
    
        addButton.addEventListener("click",() => {  /*con este evento hace que si el producto ya fue agregado , le aumenta la cantidad */
    
            const repeat = cartProducts.some((repeatProduct) => repeatProduct.id === producto.id)
    
            
            console.log(repeat)
    
            if (repeat){
                cartProducts.map((prod) => {
                    if (prod.id === producto.id){          
                        prod.cantidad++;
                        console.log(cartProducts);
                    }
                })
            }else {
                cartProducts.push({
                    id: producto.id,
                    img: producto.image,
                    nombre: producto.name,
                    precio: producto.price,
                    cantidad: producto.amount = 1,

                    
    
                    
                })
                console.log(cartProducts);
            }
    
            
            Toastify({                                                  // se crea la notificacion de que agregaste Producto al Carrito
                text: "Agregaste "+[producto.name]+" al Carrito",
                duration: 4000,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                    background: "#0f9b0f",
                },
            }).showToast();
            
            
            carritoContador() /*actualizo la cantidad en el icono*/
            saveLS() /*actualizo el localStorage */
            
    
        })
    })

}

getProductos();





/*fUNCION PARA AGREGAR AL LOCAL STOREGE*/
const saveLS = () => {
    localStorage.setItem("Cart",JSON.stringify(cartProducts));
}


// seccion Carrito

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
    const foundId  = cartProducts.find((element) => element.id === id);

    console.log(foundId);
    console.log(cartProducts);


    cartProducts = cartProducts.filter((cartProductsId) => {
        return cartProductsId !== foundId;    /*filtramo y retorna los ID que son diferente al encontrado */
    });
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

