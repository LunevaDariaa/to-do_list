"use strict";
//Selectors
const addActBtn = document.querySelector(".add-activity-btn");
const modalWindow = document.querySelector(".add_task_page");
const closeModalBtn = document.querySelector(".add_task_close_btn");
const addNoteBtn = document.querySelector(".add_note_btn");
const overlay = document.querySelector(".overlay");
const noteTextarea = document.querySelector("#add_note_input");
const noteTitle = document.querySelector("#add_note_title");
const addTaskSidebar = document.querySelector(".add_task_sidebar");
const noteContainer = document.querySelector(".notes");
//Selectors for types of activity:
const addNote = document.querySelector(".add_note_content");
const addTask = document.querySelector(".add_task_content");
const addProject = document.querySelector(".add_project_content");
//All data

class App {
  constructor() {
    addActBtn.addEventListener("click", this._openModal.bind(this));
    closeModalBtn.addEventListener("click", this._closeModal.bind(this));
  }

  //methods

  _defineType(e) {
    e.preventDefault();
    if (e.target.classList.contains("add_task_task")) {
      addNote.classList.add("hidden");
      addProject.classList.add("hidden");
      addTask.classList.remove("hidden");
    }
    if (e.target.classList.contains("add_task_project")) {
      addProject.classList.remove("hidden");
      addNote.classList.add("hidden");
      addTask.classList.add("hidden");
    }
    if (e.target.classList.contains("add_task_note")) {
      addNote.classList.remove("hidden");
      addTask.classList.add("hidden");
      addProject.classList.add("hidden");
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
}
document.addEventListener("DOMContentLoaded", function () {
  const appInstance = new App();
});

class Note {
  #notes = [];
  constructor(title, note) {
    this.title = title;
    this.note = note;
    addNoteBtn.addEventListener("click", this._addNote.bind(this));
  }

  _noteCreation(title, note) {
    const text = `<div id="note">
    <div class="note_title">${title}</div>
      <div class="note_text">
       ${note}
       <div class="note_btns">
       <button class="note_edit_btn">🖋</button>
       <button class="note_dlt_btn">🗑</button>
     </div>
     </div>`;
    noteContainer.insertAdjacentHTML("afterbegin", text);
  }

  _addNote() {
    const newNoteTitle = noteTitle.value;
    const newNote = noteTextarea.value;
    this.#notes.push(newNote);
    console.log(this.#notes);
    this._noteCreation(newNoteTitle, newNote);
  }
}

const note = new Note();
