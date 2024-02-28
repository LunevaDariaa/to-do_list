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
const projectsContainer = document.querySelector(".projects");

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
const projectsPage = document.querySelector(".projects");

class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }

  _addProjectSide(title) {
    const text = `<div class="projects_project"> -- ${title} </div>`;
    const ProjectContainerSide = document.querySelector(".projects_page");
    ProjectContainerSide.insertAdjacentHTML("beforeend", text);
  }

  _addProjectMain(project) {
    const text = `<div class="project">${project}</div>`;
    projectsContainer.insertAdjacentHTML("beforebegin", text);
  }
}

class Task {
  static dataTypeCounter = 0;
  constructor(taskTitle, taskTextArea, taskDate, taskTime) {
    this.taskTitle = taskTitle;
    this.taskTextArea = taskTextArea;
    this.taskDate = taskDate;
    this.taskTime = taskTime;
    this.dataType = Task.dataTypeCounter++;
  }

  _taskCreation(title, textarea, date, time) {
    const text = `<div class="task" data-type=${this.dataType}>
    <input type="checkbox" class="control_indicator"/>
<div class="task-title">${title}</div>
<div class="task-text"> ${textarea}</div>
<div class="task-data"> ${date}</div>
<div class="task-time">${time}</div>
<button class="task_dlt_btn">X</button>
</div>`;

    taskContainer.insertAdjacentHTML("afterbegin", text);
  }

  _addTask() {
    const newTask = {
      title: this.taskTitle,
      text: this.taskTextArea,
      date: this.taskDate,
      time: this.taskTime,
      dataType: this.dataType,
    };
    App.tasks.push(newTask);
    console.log(App.tasks);
    this._taskCreation(
      this.taskTitle,
      this.taskTextArea,
      App._timeConvertion(taskDateS),
      this.taskTime
    );
  }
}

class Note {
  static dataTypeCounter = 0;

  constructor(noteTitle, noteTextarea) {
    this.noteTitle = noteTitle;
    this.noteTextarea = noteTextarea;
    this.dataType = Note.dataTypeCounter++;
  }

  _noteCreation(title, note) {
    const text = `<div class="note" data-type=${this.dataType}>
    <div class="note_title" >${title}</div>
      <div class="note_text">
       ${note}
       <div class="note_btns">
       <button class="note_edit_btn">🖋</button>
       <button class="note_dlt_btn">🗑</button>
     </div>
     </div>`;

    // console.log(this.notes.dataType);
    noteContainer.insertAdjacentHTML("afterbegin", text);
  }

  _addNote() {
    const newNote = {
      title: this.noteTitle,
      note: this.noteTextarea,
      dataType: this.dataType,
    };

    this._noteCreation(this.noteTitle, this.noteTextarea);

    App.notes.push(newNote);
    console.log(App.notes);
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  const appInstance = new App();
});

class App {
  static notes = [];
  static tasks = [];
  static projects = [];
  constructor() {
    addActBtn.addEventListener("click", this._openModal.bind(this));
    closeModalBtn.addEventListener("click", this._closeModal.bind(this));

    addNoteBtn.addEventListener("click", this._addNote.bind(this));

    addTaskBtn.addEventListener("click", this._addTask.bind(this));

    addProjectBtn.addEventListener("click", this._addProject.bind(this));

    sidebar.addEventListener("click", this._pageRedirection.bind(this));

    // Bind the event listener functions to the instance
    this._modifyNote = this._modifyNote.bind(this);
    this._clearNote.bind(this);
    this._timeConvertion;
    this._modifyTask = this._modifyTask.bind(this);

    noteContainer.addEventListener("click", this._modifyNote.bind(this));
    taskContainer.addEventListener("click", this._modifyTask);
  }

  //methods
  static _timeConvertion(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    const [year, month, day] = date.value.split("-");
    // Convert month to a number
    const monthNumber = parseInt(month, 10);

    // Get the corresponding month name
    const monthName = months[monthNumber - 1];

    return `${monthName}, ${day}`;
  }
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
    this._clearNote();
    this._closeModal();
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
    App.projects.push(newProject);
    console.log(App.projects);
    newProject._addProjectSide(projectTitle.value);
    newProject._addProjectMain(projectTitle.value);
  }

  _hidePagesContent() {
    toDoPage.classList.add("hidden");
    noteContainer.classList.add("hidden");
    projectsPage.classList.add("hidden");
  }
  // _pageHeader() {
  //   const pageType = document.querySelector(".page_type");
  // }
  _pageRedirection(e) {
    let pageType = document.querySelector(".page_type");

    if (e.target.classList.contains("notepad_page")) {
      this._hidePagesContent();
      noteContainer.classList.remove("hidden");
      pageType.innerHTML = e.target.innerHTML;
    }

    if (e.target.classList.contains("projects_page")) {
      this._hidePagesContent();
      projectsPage.classList.remove("hidden");
      pageType.innerHTML = "Projects";
    }

    if (e.target.classList.contains("home_page")) {
      this._hidePagesContent();
      toDoPage.classList.remove("hidden");
      pageType.innerHTML = e.target.innerHTML;
    }
  }

  _editNote(noteToModify) {
    console.log("App.notes:", App.notes);

    const noteData = App.notes.find((note) => note.dataType == noteToModify);

    console.log("noteData:", noteData);

    this._openModal();

    noteTitle.value = noteData.title;
    noteTextarea.value = noteData.note;

    addNoteBtn.addEventListener("click", () => {
      // Remove the existing note from the page and array
      const noteIndex = App.notes.findIndex((note) => note === noteData);
      const noteElement = document.querySelector(
        `.note[data-type="${noteToModify}"]`
      );

      if (noteIndex !== -1 && noteElement) {
        noteElement.remove();
        App.notes.splice(noteIndex, 1);

        // Close the modal after saving the changes
        this._closeModal();
      }
    });
  }

  _deleteNote(noteToModify) {
    const noteIndex = App.notes.find((note) => note.dataType == noteToModify);
    console.log(noteIndex);
    //Remove note from the array:
    if (noteIndex !== -1) {
      App.notes.splice(noteIndex, 1);
    }

    //Remove note from the page:
    const noteEl = document.querySelector(`.note[data-type="${noteToModify}"]`);
    if (noteEl) {
      noteEl.remove();
      console.log(App.notes);
    }
  }

  _modifyNote(e) {
    //delete
    const deleteBtn = e.target.closest(".note_dlt_btn");
    const noteToModify = e.target.closest(".note").dataset.type;
    if (deleteBtn) {
      this._deleteNote(noteToModify);
    }
    //edit
    const editBtn = e.target.closest(".note_edit_btn");
    if (editBtn) {
      console.log(noteToModify);
      this._editNote(noteToModify);
    }
  }

  _clearNote() {
    noteTitle.value = "";
    noteTextarea.value = "";
  }

  //Task staff

  _deleteTask(taskToModify) {
    const taskIndex = App.tasks.find((task) => task.dataType == taskToModify);
    console.log(taskIndex);
    //Remove task from the array:
    if (taskIndex !== -1) {
      App.tasks.splice(taskIndex, 1);
    }

    //Remove task from the page:
    const taskEl = document.querySelector(`.task[data-type="${taskToModify}"]`);
    if (taskEl) {
      taskEl.remove();
      console.log(App.tasks);
    }
  }

  _modifyTask(e) {
    const deleteBtn = e.target.closest(".task_dlt_btn");

    const taskToModify = e.target.closest(".task").dataset.type;

    if (deleteBtn) {
      this._deleteTask(taskToModify);
    }
  }
}
