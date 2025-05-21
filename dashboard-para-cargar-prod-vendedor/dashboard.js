import { app, db } from "../firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
  

  try {
    await addDoc(collection(db, "productos"), { name, price, category, image, description });
    //alert("Producto agregado 🎉");
    //notificacion de Toastify
    Toastify({                                                  // se crea la notificacion de que agregaste Producto al Carrito
      text: "Agregaste " + [name] + " a tu Pagina",
      duration: 5000,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#0f9b0f",
      },
    }).showToast();
    //se resetea el Formulario
    form.reset();
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

// document.getElementById('logout').addEventListener('click', async () => {
//   try {
//     await signOut(auth);
//     window.location.href = 'login.html';
//   } catch (error) {
//     alert("Error al cerrar sesión.");
//   }
// });
