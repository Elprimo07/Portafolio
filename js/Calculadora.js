// Script Calculadora

function operar(tecla){
    var pantalla= document.getElementsByClassName('modulo');
    var textoP = pantalla[0].firstChild;
    switch (tecla) {
      case 'c':
        textoP.nodeValue= ' ';
        break;
      case '=':
        resultado = eval(textoP.nodeValue);
        textoP.nodeValue= resultado;
        break;
      default:
        textoP.nodeValue= textoP.nodeValue+ tecla;
        break;
    }
  }

  // Cambio de color

var r = $('.ripple'),
  p = $('.pantalla');


function paleta(){
$('.paleta').css('display','flex');
$('.paleta').animate({
  width: '70%'
},300);
rippleOut();
}

function paletaOut(){
$('.paleta').animate({
  width: '0%'
},300);
setTimeout(function(){
  $('.paleta').css('display','none');
},300);
}

function ripple(){
$('.ripple').animate({
  width: '1000px',
  height: '1000px',
  top: '-200px',
  left: '-200px'
  },400);
}

function rippleOut(){
r.css('width','0px');
r.css('height','0px');
r.css('top','-5px');
r.css('left','-5px');
}

function cambioColor(e){
r.css('background',e);
ripple();
paletaOut();
setTimeout(function(){
  p.css('background',e);
},400);
}