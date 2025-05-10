import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    autoResize(titleRef);
    autoResize(contentRef);
  }, [note.title, note.content]);

  function autoResize(ref) {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  function submitNote(event) {
    event.preventDefault();
    if (note.title.trim() || note.content.trim()) {
      props.onAdd(note);
      setNote({ title: "", content: "" });
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <textarea
            ref={titleRef}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            rows={1}
            style={{
              overflow: "hidden",
              resize: "none",
              fontWeight: "bold",
              fontSize: "1.3em",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          />
        )}
        <textarea
          ref={contentRef}
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          style={{ overflow: "hidden", resize: "none" }}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
