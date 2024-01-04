import React from "react";

export const NotesTabSelector = ({ tab, onTabChange }) => {
  function handleTabChange(e) {
    onTabChange(e.target.value);
  }

  return (
    <select
      className="notes-list-header__tab-changer"
      value={tab}
      onChange={handleTabChange}
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="archived">archived</option>
    </select>
  );
};
