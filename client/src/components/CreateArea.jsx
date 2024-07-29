import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function expand() {
      setExpanded(true);
  }
 
  return (
    <div>
      <form className="create-note">
        {isExpanded && ( <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/> )}
        <textarea
          onChange={handleChange}
          onClick={expand}
          name="content"
          placeholder="Create a note..."
          rows={isExpanded ? "3" : "1"}
          value={note.content}

        /> 
        
      <Zoom in={isExpanded} >
        <Fab
          onClick={(e) => {
            props.onAdd(note);
            setNote({title: "", content: ""});
            e.preventDefault();
          }}
        >
         <AddIcon/>
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
