// ============ Mostar y ocultar menu ================
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// ============ Mostar menu ==========================
// Validar si existe constante
if(navToggle){
    navToggle.addEventListener("click", ()=>{
        navMenu.classList.add("show-menu")
    })
}

// ============ Ocultar menu ==========================
// Validar si existe constante
if(navClose){
    navClose.addEventListener("click", ()=>{
        navMenu.classList.remove("show-menu")
    })
}

// ============ Eliminar menu mobile ==========================
const navLink = document.querySelectorAll(".nav__link");

function linkAction(){
    const navMenu = document.getElementById("nav-menu");
    // Cuando se de click en los nav__link se elimina la clase mostrar menu
    navMenu.classList.remove("show-menu");
}
navLink.forEach(link => link.addEventListener("click",linkAction));


// ============ Habilidades ==========================
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = "skills__content skills__close";
    }if(itemClass === "skills__content skills__close"){
        this.parentNode.className = "skills__content skills__open"
    }
}

skillsHeader.forEach(element=>{
    element.addEventListener("click", toggleSkills)
});

// ============ Pestañas de aptitudes ==========================
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach(tab =>{
    tab.addEventListener("click", ()=>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabCon =>{
            tabCon.classList.remove("qualification__active")
        })
        target.classList.add("qualification__active")

        tabs.forEach(tab =>{
            tab.classList.remove("qualification__active")
        })
        tab.classList.add("qualification__active")

    });
    
});


// ============ Services modal ==========================
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function(modalClick){
    modalViews[modalClick].classList.add("active-modal");
}

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener("click", ()=>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener("click", ()=>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove("active-modal")
        })
    })
})


// ============ Portafolio Swiper ==========================


$(document).ready(function(){
    // Owl Carousel
    $(".carousel").owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut:2000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            // 1000:{
            //     items: 3,
            //     nav: false
            // }
        }
    });
});


// ============ Identificador de color para menu ==========================
const sections = document.querySelectorAll("section[id]");

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav__menu a[href*=" + sectionId +"]").classList.add("active-link")
        }else{
            document.querySelector(".nav__menu a[href*=" + sectionId +"]").classList.remove("active-link")            
        }
    })
}

window.addEventListener("scroll",scrollActive);


// ============ Cambiar background header ==========================

function scrollHeader(){
    const nav = document.getElementById("header");
    // Cuando el escroll sea mayor que 200vh, se agrega la clase scroll-header
    if(this.scrollY >= 80) nav.classList.add("scroll-header")
    else nav.classList.remove("scroll-header")
}

window.addEventListener("scroll",scrollHeader);


// ============ Mostrar scroll top ==========================
function scrollUp(){
    const scrollUp = document.getElementById("scroll-up");
    // Cuando el scroll es mayor a 500vh, se agrega la clase show-scroll
    if(this.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll",scrollUp);


// ============ Modo oscuro ==========================
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "fa-sun"

// Tema previamente seleccionado (si el usuario lo seleccionó)
const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

// Obtenemos el tema actual que la interfaz ha validado
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light"
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? "fa-moon" : "fa-sun"

// Validamos si el usuario escogio previamente el tema
if(selectedTheme){
    // Si se cumple la validación, preguntamos cuál es el problema para saber si activamos o desactivamos
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
    themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](iconTheme)
}

// Activar / Desactivar el tema manualmente con el boton
themeButton.addEventListener("click", ()=>{
    // Agregar o quitar el icono del tema
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Guardamos el tema y el icono actal que se selecciono
    localStorage.setItem("selected-theme", getCurrentTheme())
    localStorage.setItem("selected-icon", getCurrentIcon())
})