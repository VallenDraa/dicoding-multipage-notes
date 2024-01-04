import React from "react";
import { Navbar } from "../components/ui/navbar";
import { NotesList } from "../components/notes-list";
import PropTypes from "prop-types";
import { noteValidator } from "../utils/validator";

export function ArchivePage({ notes = [] }) {
  return (
    <>
      <Navbar />
      <NotesList notes={notes} noteState="archived" />
    </>
  );
}

ArchivePage.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
};
