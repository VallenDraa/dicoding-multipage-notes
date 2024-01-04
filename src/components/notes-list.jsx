import React, { Component } from "react";
import { NoteItem } from "./note-item";
import { NoteSearchbar } from "./note-searchbar";
import { NotesTabSelector } from "./notes-tab-selector";

export class NotesList extends Component {
  constructor(props) {
    super(props);

    const defaultKeyword = "";
    const defaultTab = "all";

    this.state = {
      keyword: defaultKeyword,
      tab: defaultTab,
      filteredNotes: this.getFilteredNotes(
        props.notes,
        defaultTab,
        defaultKeyword,
      ),
    };

    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  getFilteredNotes(notes, activeTab, keyword = "") {
    let tabFilteredNotes = [];

    if (activeTab === "all") {
      tabFilteredNotes = notes;
    }

    if (activeTab === "active") {
      tabFilteredNotes = notes.filter(note => !note.archived);
    }

    if (activeTab === "archived") {
      tabFilteredNotes = notes.filter(note => note.archived);
    }

    const lowercasedKeyword = keyword.toLowerCase();

    return keyword === ""
      ? tabFilteredNotes
      : tabFilteredNotes.filter(
          note =>
            note.title.toLowerCase().includes(lowercasedKeyword) ||
            note.body.toLowerCase().includes(lowercasedKeyword) ||
            note.createdAt.toLowerCase().includes(lowercasedKeyword),
        );
  }

  onKeywordChange(keyword) {
    this.setState({ keyword });
  }

  onTabChange(tab) {
    this.setState({ tab });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.notes !== this.props.notes ||
      prevState.tab !== this.state.tab ||
      prevState.keyword !== this.state.keyword
    ) {
      const newFilteredNotes = this.getFilteredNotes(
        this.props.notes,
        this.state.tab,
        this.state.keyword,
      );

      this.setState({ filteredNotes: newFilteredNotes });
    }
  }

  render() {
    const { onArchive, onDelete } = this.props;
    const { filteredNotes, tab, keyword } = this.state;

    return (
      <div>
        <header className="notes-list-header">
          <div className="notes-list-header__top">
            <h2>{`🗒️${tab} notes`}</h2>
            <NotesTabSelector tab={tab} onTabChange={this.onTabChange} />
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
              return (
                <NoteItem
                  key={note.id}
                  note={note}
                  onArchive={onArchive}
                  onDelete={onDelete}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
