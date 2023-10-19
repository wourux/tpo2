//Javascript Menú Desplegable
const navtoggle = document.querySelector('.navtoggle')
const toggle_icon = document.querySelector('.navtoggle i')
const menu_desplegable = document.querySelector('.menu-desplegable')

navtoggle.onclick = function (){
    menu_desplegable.classList.toggle('open');
    const isOpen = menu_desplegable.classList.contains('open')

    toggle_icon.classList = isOpen
    ? 'bx bx-x'
    : 'bx bx-menu'
}

//Javascript Slider Image
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".image-slide");
const contents = document.querySelectorAll(".content");

let currentIndex = 0; //Indice inicial
const intervalTime = 5000 // Intervalo de tiempo en milisegundos para el cambio automático
let autoSlider; //Variable para almacenar el intervalo

var sliderNav = function(manual){
    //Quita la clase .active de todos los botones
    btns.forEach((btn) => {
        btn.classList.remove("active")
    })

    //Quita la clase .active para todas las imágenes
    slides.forEach((slide) => {
        slide.classList.remove("active")
    })

    //Quita la clase .active de todos los textos
    contents.forEach((content) => {
        content.classList.remove("active")
    })

    //Agrega la clase .active a todo lo anterior
    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
};

//Función para el cambio automático de fondo
function autoSlide(){
    currentIndex++;
    if (currentIndex === btns.length){
        currentIndex = 0;
    }
    sliderNav(currentIndex);
}

//Configura el intervalo para el cambio automático
autoSlider = setInterval(autoSlide, intervalTime);

//Detiene el intervalo cuando el cursor pasa sobre los botones
btns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        clearInterval(autoSlider);
    });

    //Reanuda el intervalo cuando el cursor sale de los botones
    btn.addEventListener("mouseleave", () => {
        autoSlider = setInterval(autoSlide, intervalTime);
    });
});

//Cambio manual de fondo con los botones
btns.forEach((btn,i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    })
})

//Consumo API Cotización del Dolar
fetch('https://api.bluelytics.com.ar/v2/latest') 
    .then(response => response.json()) 
    .then(data => {
        console.log(data)

        cad = 
        `<div class="container">
            <h2>Cotización Dolar Hoy</h2>
            <div class = "tarjetas">
                <div class="contenedor-dolar">
                    <img class="container-logo" src="./imagenes/logo-bluelytics.webp" alt="Bluelytics">
                    <div class="container-data">
                        <h3>Dolar Oficial</h3>
                        <div class="data-valores">
                            <p>${data.oficial.value_buy}<span>Compra</span></p>
                            <p>${data.oficial.value_sell}<span>Venta</span></p>
                        </div>
                    </div>
                    <div class="container-fecha">
                        <span>Última actualización: ${data.last_update}</span>
                    </div>
                </div>
                <div class="contenedor-dolar">
                    <img class="container-logo" src="./imagenes/logo-bluelytics.webp" alt="Bluelytics">
                    <div class="container-data">
                        <h3>Dolar Blue</h3>
                        <div class="data-valores">
                            <p>${data.blue.value_buy}<span>Compra</span></p>
                            <p>${data.blue.value_sell}<span>Venta</span></p>
                        </div>
                    </div>
                    <div class="container-fecha">
                        <span>Última actualización: ${data.last_update}</span>
                    </div>
                </div>
            </div>
        </div>`
        

        document.querySelector(".dolar").innerHTML = cad;

    });

// Validación de Formulario
function validar(){
    let mensaje = document.getElementById("mensaje");
    let error = false;
    document.getElementById("validar_mensaje").innerHTML="&nbsp; ";

    if(mensaje.value ==""){
        document.getElementById("validar_mensaje").innerHTML="Indique el motivo de su consulta***";
        error=true;
        mensaje.focus();
        // Si el campo de "Mensaje" queda en blanco, indica que el usuario debe ingresar una consulta.
        // Agregué un DIV con ID "validar_mensaje" y que se muestre en rojo el mensaje de error.
    }

    if(error==false){
        document.getElementById("mensaje").value= "";
        document.getElementById("validar_mensaje").innerHTML= "&nbsp;";
        alert("El mensaje fué enviado con éxito!");
        //Si no hay error, nos muestra el alerta de mensaje enviado. Y limpia los campos.
    }
    return !error;
}

// Botón Scroll
const btn_scrolltop = document.getElementById("btn_scrolltop");
btn_scrolltop.addEventListener('click',() =>{
    window.scrollTo(0, 0);
});

window.onscroll = () => {
    add_btn_scrolltop();
}

const add_btn_scrolltop = () => {
    if (window.scrollY < 300){
        btn_scrolltop.classList.remove("btn-scrolltop-on");
    } else {
        btn_scrolltop.classList.add("btn-scrolltop-on");
    }
}