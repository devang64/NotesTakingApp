// Function to show notes when the page loads
function showNotesOnPageLoad() {
    showNotes();
  }
  
  // When the user enters a new note
  const addButton = document.getElementById("addBtn");
  addButton.addEventListener("click", function(event) {
    const noteInput = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let notesArray;
    if (notes == null) {
      notesArray = [];
    } else {
      notesArray = JSON.parse(notes);
    }
    notesArray.push(noteInput.value);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    noteInput.value = "";
    showNotes();
  });
  
  // Function to display notes
  function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesArray;
    if (notes == null) {
      notesArray = [];
    } else {
      notesArray = JSON.parse(notes);
    }
    let html = "";
    notesArray.forEach((note, index) => {
      html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${note}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
      `;
    });
    let notesElement = document.getElementById("notes");
    if (notesArray.length != 0) {
      notesElement.innerHTML = html;
    } else {
      notesElement.innerHTML = `Uh oh, there's nothing here! add some notes in the "Add a Note" section above!`;
    }
  }
  
  // Function to delete a note
  function deleteNote(index) {
    console.log("Deleting note", index);
    let notes = localStorage.getItem("notes");
    let notesArray;
    if (notes == null) {
      notesArray = [];
    } else {
      notesArray = JSON.parse(notes);
    }
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    showNotes();
  }
  
  // Search functionality
  let searchInput = document.getElementById('searchTxt');
  searchInput.addEventListener("input", function() {
    let inputVal = searchInput.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(noteCard) {
      let cardText = noteCard.getElementsByTagName("p")[0].innerText;
      if (cardText.includes(inputVal)) {
        noteCard.style.display = "block";
      } else {
        noteCard.style.display = "none";
      }
    });
  });
  