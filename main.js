console.log("SimpleTwitter");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://mobileapp-shoppingbasket-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const twittsListInDB = ref(database, "twittsList");

const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const twitList = document.getElementById("twit-list");

//render and push to firebase on click "Publish"
btnEl.addEventListener("click", function () {
  let inputElValue = inputEl.value;

  if (inputElValue === "") {
    console.log("nothing to render");
  } else {
    push(twittsListInDB, inputElValue);

    render(inputElValue);
  }
  clear();
});

function render(objectToRender) {
  const newEl = document.createElement("p");
  newEl.textContent = objectToRender;
  twitList.append(newEl);
}

function clear() {
  inputEl.value = "";
}
