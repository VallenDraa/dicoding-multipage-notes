import React from "react";

export const NoteSearchbar = ({ keyword, onKeywordChange }) => {
  function handleKeywordChange(e) {
    onKeywordChange(e.target.value);
  }

  return (
    <input
      type="search"
      placeholder="search notes"
      value={keyword}
      onChange={handleKeywordChange}
      className="notes-list-header__searchbar"
    />
  );
};
