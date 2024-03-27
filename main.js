import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://mobileapp-shoppingbasket-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const twittsListInDB = ref(database, "twittsList");
const twittsNicksInDB = ref(database, "twittsNicks");
const twittsTagsInDB = ref(database, "twittsTags");

const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const twitList = document.getElementById("twit-list");
const fromInput = document.getElementById("from-input");
const tagInput = document.getElementById("tag-input");

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
    twitList.innerHTML = `<span class="empty-span">Nothing here yet...</span>`;
  }
});

//push to firebase on click "Publish"
btnEl.addEventListener("click", function () {
  let inputElValue = inputEl.value;

  let nicknameValue = fromInput.value;
  let tagValue = tagInput.value;

  if (inputElValue === "" || nicknameValue === "" || tagValue === "") {
    console.log("nothing to render");
  } else {
    push(twittsListInDB, inputElValue);
    push(twittsNicksInDB, nicknameValue);
    push(twittsTagsInDB, tagValue);
    clear();
  }
});

function render(itemToRender) {
  let itemId = itemToRender[0]; //taking only keys here
  let itemValue = itemToRender[1]; //taking only value here

  let newEl = document.createElement("div");
  let newElBtn = document.createElement("button");

  newElBtn.id = "delete-Btn";
  newElBtn.className = "btn-close-icon";
  newEl.id = "p-twitts-fb";

  newElBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
  newEl.innerHTML = `<div class="p-nicktwiitsandtag">
                        <p class="p-nickname">NICK</p>
                        <p class="p-twitts">${itemValue}</p>
                        <p class="p-tags">TAG</p>
                     </div>`;

  twitList.append(newEl);
  newEl.append(newElBtn);

  newElBtn.addEventListener("click", function () {
    let locationOfItemInDB = ref(database, `twittsList/${itemId}`);
    remove(locationOfItemInDB);
  });
}

function clear() {
  inputEl.value = "";
}

function clearRendered() {
  twitList.innerHTML = "";
}
