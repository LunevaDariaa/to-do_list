//Selectors
const addActBtn = document.querySelector(".add-activity-btn");
const modalWindow = document.querySelector(".add_task_page");
const closeModalBtn = document.querySelector(".add_task_close_btn");
const addNoteBtn = document.querySelector(".add_note_btn");
const overlay = document.querySelector(".overlay");
const noteTextarea = document.querySelector("#add_note_input");

const noteContainer = document.querySelector(".notes");

// EventListeners
const openModal = addActBtn.addEventListener("click", function () {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const closeModal = closeModalBtn.addEventListener("click", function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
});

const addNote = addNoteBtn.addEventListener("click", function () {
  newNote = noteTextarea.value;
  noteCreation(newNote);
});

const noteCreation = function (note) {
  const text = `<div id="note">
  <div class="note_text">
   ${note}
   div class="note_btns">
   <button class="note_edit_btn">🖋</button>
   <button class="note_dlt_btn">🗑</button>
 </div>
 </div>`;
  noteContainer.insertAdjacentHTML("afterbegin", text);
};
