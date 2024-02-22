"use strict";
//Selectors
const addActBtn = document.querySelector(".add-activity-btn");
const modalWindow = document.querySelector(".add_task_page");
const closeModalBtn = document.querySelector(".add_task_close_btn");
const addNoteBtn = document.querySelector(".add_note_btn");
const addTaskBtn = document.querySelector(".add_task_btn");
const overlay = document.querySelector(".overlay");
const noteTextarea = document.querySelector("#add_note_input");
const noteTitle = document.querySelector("#add_note_title");
const addTaskSidebar = document.querySelector(".add_task_sidebar");
const noteContainer = document.querySelector(".notes");
const taskContainer = document.querySelector(".tasks");
// Selectors for types of activity:
const addNote = document.querySelector(".add_note_content");
const addTask = document.querySelector(".add_task_content");
const addProject = document.querySelector(".add_project_content");

// Task
const taskTitleS = document.querySelector("#add_task_title");
const taskInputS = document.querySelector("#add_task_input");
const taskDateS = document.querySelector("#add_task_date");
const taskTimeS = document.querySelector("#add_task_time");
//Project
const addProjectBtn = document.querySelector(".add_project_btn");
const projectTitle = document.querySelector(".add_project_input");

//Sidebar links
const sidebar = document.querySelector(".sidebar");

//Main Screen content:
const toDoPage = document.querySelector(".to-dos_page");

// const homePage = document.querySelector(".home_page");
// const todayPage = document.querySelector(".today_page");
// const projectPage = document.querySelector(".projects_page");
// const notepadPage = document.querySelector(".notepad_page");
class App {
  constructor() {
    addActBtn.addEventListener("click", this._openModal.bind(this));
    closeModalBtn.addEventListener("click", this._closeModal.bind(this));

    addNoteBtn.addEventListener("click", this._addNote.bind(this));

    addTaskBtn.addEventListener("click", this._addTask.bind(this));

    addProjectBtn.addEventListener("click", this._addProject.bind(this));

    sidebar.addEventListener("click", this._pageRedirection);
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

  _addTask() {
    const newTask = new Task(
      taskTitleS.value,
      taskInputS.value,
      taskDateS.value,
      taskTimeS.value
    );
    newTask._addTask();
  }

  _addProject() {
    const newProject = new Project(projectTitle.value);
    newProject._addProject(projectTitle.value);
  }

  _pageRedirection(e) {
    if (e.target.classList.contains("notepad_page")) {
      console.log("note");
      toDoPage.classList.add("hidden");
      noteContainer.classList.remove("hidden");
    }
  }

  _showPagesContent() {
    toDoPage.classList.add("hidden");
    noteContainer.classList.add("hidden");
  }
}

class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }

  _addProject(title) {
    const text = `<div class="project"> -- ${title} </div>`;
    const ProjectContainer = document.querySelector(".projects_page");
    ProjectContainer.insertAdjacentHTML("beforeend", text);
  }
}

class Task {
  #tasks = [];
  constructor(taskTitle, taskTextArea, taskDate, taskTime) {
    this.taskTitle = taskTitle;
    this.taskTextArea = taskTextArea;
    this.taskDate = taskDate;
    this.taskTime = taskTime;
  }

  _taskCreation(title, textarea, date, time) {
    const text = `<div class="task">
<div class="task-title">${title}</div>
<div class="task-text"> ${textarea}</div>
<div class="task-data"> ${date}</div>
<div class="task-time">${time}</div>
</div>`;

    taskContainer.insertAdjacentHTML("afterbegin", text);
  }

  _addTask() {
    const newTask = {
      title: this.taskTitle,
      text: this.taskTextArea,
      date: this.taskDate,
      time: this.taskTime,
    };
    this.#tasks.push(newTask);
    console.log(this.#tasks);
    this._taskCreation(
      this.taskTitle,
      this.taskTextArea,
      this.taskDate,
      this.taskTime
    );
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
    const text = `<div class="note">
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
