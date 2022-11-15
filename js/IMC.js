let i = 0;

let bmiObj = {
  gender: null,
  height: null,
  weight: null
}

let style = (function() {
    let style = document.createElement('style');

    style.appendChild(document.createTextNode(''));

    document.head.appendChild(style);

    return style;
})();

function changeRangeValue(){
  let textContainer;
  
  if(this.classList.contains('height-input')) {
    textContainer = document.querySelector('.range-value-height'); 
  } else if(this.classList.contains('weight-input')) {
    textContainer = document.querySelector('.range-value-weight'); 
  }
  textContainer.innerText = this.value;
}

function countBMI() {
  let squareHeight = Math.pow(bmiObj.height/100, 2);
  let bmi = bmiObj.weight / squareHeight;
  return bmi.toFixed(1);
}

function setVisibility(to, from) {
  let oldView = document.querySelector(from); 
  let newView = document.querySelector(to);
  
  oldView.classList.remove('showArticle');
  newView.classList.add('showArticle');  
}

function changeView(value, to, from) {
  if(from === '.gender') {
    bmiObj.gender = value;
  } else if(from === '.height') {
    bmiObj.height = parseInt(value);
  } else if(from === '.weight') {
    bmiObj.weight = parseInt(value);
  }
  setVisibility(to, from);
  
  if(from === '.weight') {
    console.log(countBMI());
    counter(countBMI());
  }
}

function setAnimation(value) {
  let maxValue = 40;
  let valuePercent = value / maxValue * 100;
  
  if(style.sheet.cssRules.length != 0) {
    for(let j = 0; j < style.sheet.cssRules.length; j++) {
      style.sheet.deleteRule(j);
    }      
  }
    
    style.sheet.insertRule(`@keyframes spin {
    to { stroke-dasharray: ` + valuePercent + ` 100; }
  }`, 0);
  
    if(value <= 18.5) {
      style.sheet.insertRule(`@keyframes changeBg {
        0% { stroke: #abd7eb; }
      100% { stroke: #abd7eb; }
  }`, 0);   
    } else if(value <= 25 && value > 18.5) {
      style.sheet.insertRule(`@keyframes changeBg {
        0% { stroke: #abd7eb; }
        46% { stroke: #abd7eb; }
        100% { stroke: #a4f5ac; }
  }`, 0); 
    } else if( value <= 30 && value > 25) {
      style.sheet.insertRule(`@keyframes changeBg {
        0% { stroke: #abd7eb; }
        46% { stroke: #abd7eb; }
        62% { stroke: #a4f5ac; }
        100% { stroke: #FFCC00; }
  }`, 0); 
    } else if( value > 30) {
      style.sheet.insertRule(`@keyframes changeBg {
        0% { stroke: #abd7eb; }
        46% { stroke: #abd7eb; }
        62% { stroke: #a4f5ac; }
        75% { stroke: #FFCC00; }
      100% { stroke: #FF719A; }
  }`, 0); 
    }
}

function counter(value) {
  setAnimation(value);
  
  let pieCircle = document.querySelector('.pie-circle');
  pieCircle.classList.remove('startAnimation');  
  i = 0;
  
  setTimeout( function() { 
    pieCircle.classList.add('startAnimation'); 
  
    let counter = setInterval( function() {
      if( i < value) {
        document.querySelector('.pie-chart-number').innerHTML = ++i;
      } else {
        clearInterval(counter);
      }
    }, 1300 / value);
                        
  }, 100);
}

document.querySelector('.gender-button-male').addEventListener('click', function() {
  changeView('male', '.height', '.gender');
});
document.querySelector('.gender-button-female').addEventListener('click', function() {
  changeView('female', '.height', '.gender');
});
document.querySelector('.height-button').addEventListener('click', function() {
  let inputValue = document.querySelector('.height-input').value;
  changeView(inputValue, '.weight', '.height');
});
document.querySelector('.calc-button').addEventListener('click', function() {
  let inputValue = document.querySelector('.weight-input').value;
  changeView(inputValue, '.result', '.weight');
});

document.querySelector('.height-input').addEventListener('input', changeRangeValue);
document.querySelector('.weight-input').addEventListener('input', changeRangeValue);