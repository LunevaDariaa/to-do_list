//Selectors
const addActBtn = document.querySelector(".add-activity-btn");
const modalWindow = document.querySelector(".add_task_page");
const closeModalBtn = document.querySelector(".add_task_close_btn");

// EventListeners
const openModal = addActBtn.addEventListener("click", function () {
  modalWindow.classList.remove("hidden");
});

const closeModal = closeModalBtn.addEventListener("click", function () {
  modalWindow.classList.add("hidden");
});
