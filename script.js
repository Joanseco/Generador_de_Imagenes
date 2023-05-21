// Obtiene la referencia al botón, al mensaje de error y a la galería en el HTML
const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

// Función asincrónica que realiza la solicitud de imágenes
async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  // Verifica si el valor ingresado está fuera del rango permitido (1-10)
  if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Los números deben estar entre 1 y 10";
    return;
  }

  imgs = "";

  try {
    btnEl.style.display = "none";
    // Muestra un ícono de carga mientras se realizan las peticiones
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    // Realiza una petición a la API de Unsplash para obtener las imágenes
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=B8S3zB8gCPVCvzpAhCRdfXg_aki8PZM_q5pAyzDUvlc`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          // Genera el Div HTML para cada imagen recibida y las agrega al elemento de la galería
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>`;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
            errorMessageEl.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    console.log(error);
    // Muestra un mensaje de error si hay algún problema con la petición
    errorMessageEl.style.display = "block";
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "El número de peticiones está agotado, trata mas tarde";
    btnEl.style.display = "block";
    galleryEl.style.display = "none";
  }
}
// Agrega un event listener al botón para ejecutar la función fetchImage al hacer clic
btnEl.addEventListener("click", fetchImage);