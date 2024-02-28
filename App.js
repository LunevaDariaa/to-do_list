import { Project } from "./project.js";
import { Task } from "./task.js";
import { Note } from "./note.js";

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
export class App {
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
    this._clearTask();
    this._closeModal();
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

  _deleteItem(itemArray, itemType, itemToModify) {
    const itemIndex = itemArray.findIndex(
      (item) => item.dataType == itemToModify
    );

    // Remove item from the array:
    if (itemIndex !== -1) {
      itemArray.splice(itemIndex, 1);
    }

    // Remove item from the page:
    const itemEl = document.querySelector(
      `.${itemType}[data-type="${itemToModify}"]`
    );
    if (itemEl) {
      itemEl.remove();
      console.log(itemArray);
    }
  }
  _deleteNote(noteToModify) {
    this._deleteItem(App.notes, "note", noteToModify);
  }

  _deleteTask(taskToModify) {
    this._deleteItem(App.tasks, "task", taskToModify);
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

  _clearTask() {
    taskTitleS.value = "";
    taskInputS.value = "";
    taskDateS.value = "";
    taskDateS.value = "";
  }

  _modifyTask(e) {
    const deleteBtn = e.target.closest(".task_dlt_btn");

    const taskToModify = e.target.closest(".task").dataset.type;

    if (deleteBtn) {
      this._deleteTask(taskToModify);
    }
  }
}
