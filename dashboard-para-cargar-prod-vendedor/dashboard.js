import { app, db } from "../firebase-config.js";
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDocs, deleteDoc, doc  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     window.location.href = 'login.html';
//   }
// });



const form = document.getElementById('product-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const image = document.getElementById('image').value;
  const description = document.getElementById('description').value;
  limpiarProductos();
  

  try {
    await addDoc(collection(db, "productos"), { name, price, category, image, description });
    //alert("Producto agregado 🎉");
    //notificacion de Toastify
    Toastify({                                                  // se crea la notificacion de que agregaste Producto al Carrito
      text: "Agregaste " + name + " a tu Pagina",
      duration: 5000,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#0f9b0f",
      },
    }).showToast();
    //se resetea el Formulario
    form.reset();
    // setTimeout(() => {
    //   location.reload()
    // }, "1000");
  } catch (err) {
    //alert("Error al agregar.");
    Toastify({                                                  /*se crea la notificacion del evento que elimina elementos del carrito */
      text: "Error: No se pudo subir" + [name] + " a la Pagina",
      duration: 5000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to top, #ee0979, #ff6a00)",
      },
    }).showToast()
  }
});


function limpiarProductos(){
  contenedor.innerHTML ='<h1>Productos</h1>';
}

// document.getElementById('logout').addEventListener('click', async () => {
//   try {
//     await signOut(auth);
//     window.location.href = 'login.html';
//   } catch (error) {
//     alert("Error al cerrar sesión.");
//   }
// });


//Productos que tenemos cargados

let cartProducts = []; 
let contenedor = document.getElementById("item-products")

const getProductos = async () => {      /*la promesa que toma los elemento de data.json*/
    onSnapshot(collection(db, "productos"),(dato) => {
    //const response = await getDocs(collection(db, "productos"));
    //response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //const data = JSON.stringify(datas);
    //console.log(data);
    
    //console.log(contenedor1);

    dato.forEach((producto) => {
        let productos = producto.data();
        let contenedor1 = document.createElement("div") /* creo el Div que Contiene el Producto */
        contenedor1.className = "cartProductos" /* le agrego una clase para dar estilo */
        contenedor1.innerHTML = /*`<span>ID: ${producto.id}</span>*/
                                `<img src="${productos.image}" alt="">
                                <h3>${productos.name}</h3>
                                <h4>$${productos.price}</h4>`
        contenedor.append(contenedor1); /* inserto el producto en el DOM */
    
        
        let addButton = document.createElement("button") /* creo el Boton agregar */
        addButton.innerText = "Eliminar";
        addButton.className = "productoEliminar"
    
        contenedor1.append(addButton)  /* inserto el boton en el producto */


        let eliminar = contenedor1.querySelector(".productoEliminar")
        eliminar.addEventListener("click", () => {
            // Toastify({                                                  /*se crea la notificacion del evento que elimina elementos del carrito */
            //     text: "Eliminaste "+[products.nombre]+" del Carrito",
            //     duration: 4000,
            //     gravity: "top", // `top` or `bottom`
            //     position: "right", // `left`, `center` or `right`
            //     style: {
            //         background: "linear-gradient(to top, #ee0979, #ff6a00)",
            //     },
            // }).showToast()
            //console.log(producto.id); //se prueba que id selecciona
            eliminarProducto(producto.id); //id selecciona para eliminar para luego pasar a la funcion eliminar producto
            limpiarProductos(); // aca limpiamos la seccion de Productos para que onsnapshot lo vuelva a cargar
            
        })

    });
  });   
}; 

getProductos();

async function eliminarProducto(productoId) {
  const documentRef = doc(db, "productos", productoId); //se selcciona la base de Datos, productos que es la seleccion , el id a liminar
  console.log(productoId) //se prueba que id seleccionada
  // Delete the document
  try {
    await deleteDoc(documentRef); //codigo de Firebase para eliminar el producto
    //console.log("Document successfully deleted!");
    Toastify({                                                  
      text: "Eliminaste del Carrito",
      duration: 4000,
      gravity: "top", // `top` or `bottom`                  /*se crea la notificacion del evento que elimina elementos del carrito */
      position: "right", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to top, #ee0979, #ff6a00)",
      },
    })
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}
