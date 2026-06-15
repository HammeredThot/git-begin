const button = document.querySelector("#addButton");
const input = document.querySelector("#noteInput");
const notesList = document.querySelector("#notesList");

function saveNotes() {
    const notes = [];

    document.querySelectorAll("#notesList li").forEach(li => {
        notes.push(li.firstChild.textContent.trim());
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(noteText) {
    const li = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
    	li.remove();
    	saveNotes();
    });

    li.textContent = noteText + " ";
    li.appendChild(deleteButton);

    notesList.appendChild(li);
}

button.addEventListener("click", addNote);

const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

savedNotes.forEach(note => {
    createNote(note);
});

function addNote() {
    const noteText = input.value.trim();

    if (!noteText) return;

    createNote(noteText);
    saveNotes();

    input.value = "";
}

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});