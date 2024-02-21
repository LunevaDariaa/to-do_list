"use strict";
//Selectors
const addActBtn = document.querySelector(".add-activity-btn");
const modalWindow = document.querySelector(".add_task_page");
const closeModalBtn = document.querySelector(".add_task_close_btn");
const addNoteBtn = document.querySelector(".add_note_btn");
const overlay = document.querySelector(".overlay");
const noteTextarea = document.querySelector("#add_note_input");
const addTaskSidebar = document.querySelector(".add_task_sidebar");
const noteContainer = document.querySelector(".notes");
//Selectors for types of activity:
const addNote = document.querySelector(".add_note_content");
const addTask = document.querySelector(".add_task_content");
const addProject = document.querySelector(".add_project_content");
//All data

class App {
  #notes = [];

  constructor() {
    addActBtn.addEventListener("click", this._openModal.bind(this));
    closeModalBtn.addEventListener("click", this._closeModal.bind(this));
    // addNoteBtn.addEventListener("click", this._addNote.bind(this));
  }

  //methods
  _noteCreation(note) {
    const text = `<div id="note">
    <div class="note_text">
     ${note}
     <div class="note_btns">
     <button class="note_edit_btn">🖋</button>
     <button class="note_dlt_btn">🗑</button>
   </div>
   </div>`;
    noteContainer.insertAdjacentHTML("afterbegin", text);
  }

  _defineType(e) {
    e.preventDefault();
    if (e.target.classList.contains("add_task_task")) {
      addNote.classList.add("hidden");
      addTask.classList.remove("hidden");
    }
    if (e.target.classList.contains("add_task_project")) {
      console.log("project");
    }
    if (e.target.classList.contains("add_task_note")) {
      addNote.classList.remove("hidden");
      addTask.classList.add("hidden");
    }
  }
  _openModal() {
    modalWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
    addTaskSidebar.addEventListener("click", this._defineType);
  }

  _closeModal() {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  _addNote() {
    const newNote = noteTextarea.value;
    this._noteCreation(newNote);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const appInstance = new App();
});
