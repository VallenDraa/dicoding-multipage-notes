import React from "react";
import { Navbar } from "../../components/ui/navbar";
import PropTypes from "prop-types";
import { noteValidator } from "../../utils/validator";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./note-page.css";

export function NotePage({ notes, onArchive, onDelete }) {
  const { id } = useParams();
  const note = notes.find(note => note.id === id);
  const navigate = useNavigate();

  function handleArchive() {
    onArchive(id);
    navigate(note.archived ? "/archive" : "/");
  }

  function handleDelete() {
    const isConfirmed = confirm("are you sure you want to delete this note?");

    if (isConfirmed) {
      onDelete(id);
      navigate("/");
    }
  }

  return (
    <>
      <Navbar />
      {note ? (
        <section className="note__wrapper">
          <div className="note__header">
            <Link to="/" className="note__back-link">
              &larr; back
            </Link>

            <h2
              className="note__title"
              dangerouslySetInnerHTML={{ __html: note.title }}
            ></h2>
            <time dateTime={note.createdAt} className="note__created-at">
              {new Date(note.createdAt).toLocaleString()}
            </time>
          </div>

          <p
            className="note__content"
            dangerouslySetInnerHTML={{ __html: note.body }}
          ></p>
          <span className="note__end-message">end of note.</span>

          <div className="note__actions-wrapper">
            <div className="note__actions">
              <button
                title={note.archived ? "unarchive" : "archive"}
                className="note__action"
                onClick={handleArchive}
              >
                <span>{note.archived ? "📂" : "📁"}</span>
              </button>
              <button
                title="delete"
                className="note__action"
                onClick={handleDelete}
              >
                <span>⛔</span>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="note__missing-wrapper">
          <h2 className="note__missing-title">can't find note.</h2>
          <p className="note__missing-message">
            it seems that the note you we're looking is missing!
          </p>
          <Link to="/" className="note__back-link">
            🏠return home
          </Link>
        </section>
      )}
    </>
  );
}

NotePage.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
