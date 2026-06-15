const button = document.querySelector("#addButton");
const input = document.querySelector("#noteInput");
const notesList = document.querySelector("#notesList");

function saveNotes() {
    const notes = [];

    document.querySelectorAll("#notesList li").forEach(li => {
        notes.push({
            text: li.firstChild.textContent.trim(),
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(noteText, completed = false) {
    const li = document.createElement("li");
    
    if (completed) {
        li.classList.add("completed");
    }
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveNotes();
    });
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();
    	li.remove();
        updateNoteCount();
    	saveNotes();
    });

    li.textContent = noteText + " ";
    li.appendChild(deleteButton);

    notesList.appendChild(li);
    updateNoteCount();
}

button.addEventListener("click", addNote);

const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

savedNotes.forEach(note => {
    createNote(note.text, note.completed);
});
updateNoteCount();

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

function updateNoteCount() {
    const count = document.querySelectorAll("#notesList li").length;

    document.querySelector("#noteCount").textContent =
        count === 1 ? "1 note" : `${count} notes`;
}