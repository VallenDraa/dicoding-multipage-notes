import React from "react";
import { NotesList } from "../components/notes-list";
import { Navbar } from "../components/ui/navbar";
import PropTypes from "prop-types";
import { noteValidator } from "../utils/validator";

export function HomePage({ notes = [] }) {
  return (
    <>
      <Navbar />
      <NotesList notes={notes} noteState="active" />
    </>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
};
