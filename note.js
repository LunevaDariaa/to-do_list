export class Note {
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
