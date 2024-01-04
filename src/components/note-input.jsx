import { Component } from "react";
import { createNewNote } from "../utils";

export class NoteInput extends Component {
  static MAX_TITLE_LENGTH = 50;

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      isInputValid: false,
    };

    this.validateNewNote = this.validateNewNote.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateNewNote(title, body) {
    this.setState({
      isInputValid: title.length <= 50 && title !== "" && body !== "",
    });
  }

  handleTitleChange(e) {
    const newTitle =
      e.target.value.length <= 50 ? e.target.value : this.state.title;

    this.validateNewNote(newTitle, this.state.body);
    this.setState({ title: newTitle });
  }

  handleBodyChange(e) {
    const newBody = e.target.value;

    this.setState({ body: newBody });
    this.validateNewNote(this.state.title, newBody);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.isInputValid) {
      this.props.onAddNote(createNewNote(this.state.title, this.state.body));
    }

    this.setState({ isInputValid: false, body: "", title: "" });
  }

  render() {
    const { title, body, isInputValid } = this.state;

    return (
      <div className="note-input">
        <header className="note-input__header">
          <h2 className="note-input__header-title">📝new note</h2>
          <span className="note-input__title__char-limit">{`characters left: ${
            NoteInput.MAX_TITLE_LENGTH - this.state.title.length
          }`}</span>
        </header>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="title"
            onChange={this.handleTitleChange}
            className="note-input__title"
            value={title}
          />
          <textarea
            value={body}
            placeholder="body content"
            onChange={this.handleBodyChange}
            className="note-input__body"
          ></textarea>
          <button disabled={!isInputValid}>{`${
            isInputValid ? "✏️ add note" : "🚫 can't add note"
          }`}</button>
        </form>
      </div>
    );
  }
}
