const button = document.querySelector("button");
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

button.addEventListener("click", function () {
    const noteText = input.value.trim();

    if (!noteText) return;

    createNote(noteText);
    saveNotes();

    input.value = "";
});

const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

savedNotes.forEach(note => {
    createNote(note);
});