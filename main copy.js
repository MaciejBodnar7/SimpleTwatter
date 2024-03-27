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

// onvalue
onValue(twittsListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listArray = Object.entries(snapshot.val());
    clearRendered();
    //Loop becouse if u render without loop it will render as one whole piece
    let renderQ = "";
    for (let i = 0; i < listArray.length; i++) {
      renderQ = listArray[i]; //keys and values here as array
      render(renderQ); //keys and value are transported via function
    }
  } else {
    twitList.innerHTML = "Nothing here yet...";
  }
});

//push to firebase on click "Publish"
btnEl.addEventListener("click", function () {
  let inputElValue = inputEl.value;

  if (inputElValue === "") {
    console.log("nothing to render");
  } else {
    push(twittsListInDB, inputElValue);
  }
  clear();
});

function render(itemToRender) {
  let itemId = itemToRender[0]; //taking only keys here
  let itemValue = itemToRender[1]; //taking only value here
  let newEl = document.createElement("div");
  newEl.id = "p-twitts-fb";
  newEl.innerHTML = `<p class=p-twitts>${itemValue}</p>
                      <div id="delete-Btn" class="btn-close-icon"><i class='fa-solid fa-x'></i></div>
  `;
  newEl.addEventListener("click", function () {
    console.log("testsetsd");
  });
  twitList.append(newEl);
}

function clear() {
  inputEl.value = "";
}

function clearRendered() {
  twitList.innerHTML = "";
}
