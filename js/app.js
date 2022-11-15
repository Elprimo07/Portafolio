const title = document.getElementById("title");
const datePhoto = document.getElementById("datePhoto");
const explanation = document.getElementById("explanation");
const urlPhoto = document.getElementById("urlPhoto");
const date = document.getElementById("date");

date.addEventListener("change", () => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    title.textContent = response.title;
    datePhoto.textContent = response.date;
    explanation.textContent = response.explanation;
    urlPhoto.src = response.url;
  });
  xhr.open(
    "GET",
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date.value}`
  );
  xhr.send();
});
