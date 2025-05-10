import React, { useState, useRef, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

function Note(props) {
  const [isEditing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  const textareaRef = useRef(null);

  // Auto-resize on content change
  useEffect(() => {
    if (isEditing) autoResize();
  }, [editedNote.content, isEditing]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdate() {
    props.onUpdate(props.id, editedNote);
    setEditing(false);
  }

  function autoResize() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  return (
    <div className={`note ${isEditing ? "editing" : ""}`}>
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            style={{ fontSize: "1.2em", fontWeight: "bold" }}
          />
          <textarea
            ref={textareaRef}
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            style={{ overflow: "hidden", resize: "none" }}
          />
          <button className="done-btn" onClick={handleUpdate}>
            <DoneIcon />
          </button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={() => setEditing(true)}>
            <EditIcon />
          </button>
          <button onClick={() => props.onDelete(props.id)}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;
