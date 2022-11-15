//JS
const base_url = "https://rickandmortyapi.com/api";
let personajes = [];
const limit = 9;
let option1 = null;
let count = 0;

const getCharacter = async () => {
  let allCharacter = [];
  const image2 =
    "https://steamuserimages-a.akamaihd.net/ugc/976613696891628133/413E8B6E6AB8E0EE8C5638A983B36CF6CA180BAB/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false";
  let state = false;
  url = `${base_url}/character`;
  const response = await fetch(url);
  const data = await response.json();
  data.results.forEach((element) => {
    let character = { ...element, image2, state };
    allCharacter.push(character);
  });
  return allCharacter;
};

const getRandom = (array) => {
  let selectedCharacter = [];
  while (selectedCharacter.length != limit) {
    let random = Math.floor(Math.random() * array.length);
    if (!selectedCharacter.includes(array[random])) {
      selectedCharacter.push(array[random]);
    }
  }
  return selectedCharacter.concat(selectedCharacter);
};

const shuffle = (array) => {
  let index = array.length;
  let randomIndex;
  while (0 !== index) {
    randomIndex = Math.floor(Math.random() * index);
    index--;
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
};

const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const showUnshow = async (array, id) => {
  document.getElementById(id).classList.toggle("is-flipped");
  await wait(250);
  let cover = document.getElementById(`${id}a`);
  if (cover.src == array[id].image2) {
    cover.src = array[id].image;
  } else {
    cover.src = array[id].image2;
  }
};

const validation = (id) => {
  if (!option1) {
    option1 = id;
    return false;
  } else {
    return true;
  }
};

const win = async (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].state == false) {
      showUnshow(array, i);
    }
  }
  await wait(2000);
  toggleModal();
};

const revelar = async (id) => {

  if (personajes[id].state == true || id == option1) {
    return null;
  }
  await showUnshow(personajes, id);
  await wait(1000);
  if (validation(id)) {
    if (personajes[id].id == personajes[option1].id) {
      personajes[option1].state = true;
      personajes[id].state = true;
      option1 = null;
      count++;
      console.log(count);
      if (count == limit - 1) {
        win(personajes);
      }
    } else {
      console.log("son diferentes");
      showUnshow(personajes, option1);
      showUnshow(personajes, id);
      option1 = null;
    }
  }
};

const hideCards = async (array) => {
  ms = 2000;
  await wait(ms);
  for (let i = 0; i < array.length; i++) {
    showUnshow(array, i);
  }
};

const throwCards = async () => {
  let character = [];
  character = await getCharacter();
  let selectedCharacter = [];
  selectedCharacter = getRandom(character);
  selectedCharacter = shuffle(selectedCharacter);

  for (let i = 0; i < selectedCharacter.length; i++) {
    personajes.push(selectedCharacter[i]);
    let dealer = document.getElementById("cartas");
    dealer.insertAdjacentHTML(
      "afterbegin",
      `<div class="col-md-2"> 
      <div class="card" id=${i} onClick="revelar(id)">
      <img id="${i}a" src="${selectedCharacter[i].image}">  
      </div>
      </div>`
    );
  }

  hideCards(selectedCharacter);
};

const restart = () =>{
  location.reload();
}
const toggleModal = () => document.getElementById("win-modal").classList.toggle("reveal");

throwCards();