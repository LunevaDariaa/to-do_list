export class Task {
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
