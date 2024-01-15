console.log("Welcome to notes app by The Great Saliha 😍.");
const Helper = {
  storage: {
    get: (itemName) => JSON.parse(localStorage.getItem(itemName)) || [],
    set: (itemName, data) =>
      localStorage.setItem(itemName, JSON.stringify(data)),
  },
  element: {
    id: (name) => document.getElementById(name),
    class: (name) => document.getElementsByClassName(name),
  },
};
showNotes();
// If user adds a note, add it to the localStorage
let addBtn = Helper.element.id("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = Helper.element.id("addTxt");
  let notesObj = Helper.storage.get("notes");
  notesObj.push(addTxt.value);
  Helper.storage.set("notes", notesObj);
  addTxt.value = "";
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notesObj = Helper.storage.get("notes");
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text">${element}</p>
      <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
  </div> `;
  });

  let notesElem = Helper.element.id("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes..`;
  }
}

// function to delete a note
function deleteNote(index) {
  let notesObj = Helper.storage.get("notes");
  notesObj.splice(index, 1);
  Helper.storage.set("notes", notesObj);
  showNotes();
}

// Function to filter Search Bar

let search = Helper.element.id("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
