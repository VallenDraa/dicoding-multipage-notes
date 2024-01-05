import PropTypes from "prop-types";
import React, { Component } from "react";
import { NoteSearchbar } from "./note-searchbar";
import { noteValidator } from "../utils/validator";
import { getFilteredNotes } from "../utils";
import { NoteItem } from "./note-item";

export class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredNotes: getFilteredNotes(
        props.notes,
        props.noteState,
        props.keyword,
      ),
    };

    this.onKeywordChange = this.onKeywordChange.bind(this);
  }

  onKeywordChange(keyword) {
    this.props.onSearch(keyword);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.notes !== this.props.notes ||
      prevProps.keyword !== this.props.keyword
    ) {
      const newFilteredNotes = getFilteredNotes(
        this.props.notes,
        this.props.noteState,
        this.props.keyword,
      );

      this.setState({ filteredNotes: newFilteredNotes });
    }
  }

  render() {
    const { noteState, keyword } = this.props;
    const { filteredNotes } = this.state;

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
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(noteValidator).isRequired,
  noteState: PropTypes.oneOf(["active", "archived"]).isRequired,
};
