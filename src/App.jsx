import { Component } from "react";
import { NoteInput } from "./components/note-input";
import { NotesList } from "./components/notes-list";
import { getInitialData, saveNotes } from "./utils";

export class App extends Component {
  constructor() {
    super();

    this.state = { notes: getInitialData() };

    this.onAddNote = this.onAddNote.bind(this);
    this.onArchive = this.onArchive.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onAddNote(note) {
    const newNotes = [...this.state.notes, note];

    this.setState({ notes: newNotes });
    saveNotes(newNotes);
  }

  onArchive(id) {
    const newNotes = [...this.state.notes];

    newNotes.forEach((note, i) => {
      if (note.id === id) {
        newNotes[i].archived = !newNotes[i].archived;
      }
    });

    this.setState({ notes: newNotes });
    saveNotes(newNotes);
  }

  onDelete(id) {
    const newNotes = [...this.state.notes].filter(note => note.id !== id);

    this.setState({ notes: newNotes });
    saveNotes(newNotes);
  }

  render() {
    const { notes } = this.state;

    return (
      <div className="note-app">
        <header className="note-app__header">
          <h1>notnotion.</h1>
        </header>

        <main className="note-app__body">
          <NoteInput onAddNote={this.onAddNote} />
          <NotesList
            notes={notes}
            onArchive={this.onArchive}
            onDelete={this.onDelete}
          />
        </main>
      </div>
    );
  }
}
