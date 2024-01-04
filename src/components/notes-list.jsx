import PropTypes from "prop-types";
import React, { Component } from "react";
import { NoteSearchbar } from "./note-searchbar";
import { noteValidator } from "../utils/validator";
import { getFilteredNotes } from "../utils";
import { NoteItem } from "./note-item";

export class NotesList extends Component {
  constructor(props) {
    super(props);

    const defaultKeyword = "";

    this.state = {
      keyword: defaultKeyword,
      filteredNotes: getFilteredNotes(
        props.notes,
        props.noteState,
        defaultKeyword,
      ),
    };

    this.onKeywordChange = this.onKeywordChange.bind(this);
  }

  onKeywordChange(keyword) {
    this.setState({ keyword });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.notes !== this.props.notes ||
      prevState.keyword !== this.state.keyword
    ) {
      const newFilteredNotes = getFilteredNotes(
        this.props.notes,
        this.props.noteState,
        this.state.keyword,
      );

      this.setState({ filteredNotes: newFilteredNotes });
    }
  }

  render() {
    const { noteState } = this.props;
    const { filteredNotes, keyword } = this.state;

    return (
      <div>
        <header className="notes-list-header">
          <div className="notes-list-header__top">
            <h2>{`🗒️${noteState} notes`}</h2>
          </div>
          <NoteSearchbar
            keyword={keyword}
            onKeywordChange={this.onKeywordChange}
          />
        </header>

        {filteredNotes.length === 0 ? (
          <p className="notes-list__empty-message">no notes here 🙅</p>
        ) : (
          <ul className="notes-list">
            {filteredNotes.map(note => {
              return <NoteItem key={note.id} note={note} />;
            })}
          </ul>
        )}
      </div>
    );
  }
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
  noteState: PropTypes.oneOf(["active", "archived"]).isRequired,
};
