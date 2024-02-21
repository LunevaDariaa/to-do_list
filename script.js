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
// Selectors for types of activity:
const addNote = document.querySelector(".add_note_content");
const addTask = document.querySelector(".add_task_content");
const addProject = document.querySelector(".add_project_content");
// All data

class App {
  constructor() {
    addActBtn.addEventListener("click", this._openModal.bind(this));
    closeModalBtn.addEventListener("click", this._closeModal.bind(this));

    addNoteBtn.addEventListener("click", this._addNote.bind(this));
  }

  //methods

  _defineType(e) {
    e.preventDefault();

    const hideAll = () => {
      addNote.classList.add("hidden");
      addTask.classList.add("hidden");
      addProject.classList.add("hidden");
    };

    const type = e.target.dataset.type;
    if (type) {
      hideAll();
      document.querySelector(`.add_${type}_content`).classList.remove("hidden");
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
    const noteTitleValue = noteTitle.value;
    const noteTextareaValue = noteTextarea.value;

    const newNote = new Note(noteTitleValue, noteTextareaValue);
    newNote._addNote();
  }
}

class Note {
  #notes = [];
  constructor(noteTextarea, noteTitle) {
    this.noteTitle = noteTitle;
    this.noteTextarea = noteTextarea;
    // addNoteBtn.addEventListener("click", this._addNote.bind(this));
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
    const newNote = {
      title: this.noteTitle,
      note: this.noteTextarea,
    };

    this.#notes.push(newNote);
    console.log(this.#notes);
    this._noteCreation(this.noteTitle, this.noteTextarea);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const appInstance = new App();
});

class Task {
  constructor(taskTitle, taskTextArea, taskDate, taskTime) {
    this.taskTitle = taskTitle;
    this.taskTextArea = taskTextArea;
    this.taskDate = taskDate;
    this.taskTime = taskTime;
  }
}
