import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Welcome from "./Welcome";
import CreateArea from "./CreateArea";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFromStorage, setInStorage } from "../utilities/storage";
import { useHistory } from "react-router-dom";

var App = (props) => {
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");

  const notify = () => toast.warn("Notes Saved Successfully!!");
  const history = useHistory();

  useEffect(() => {
    function getToken() {
      const ac = new AbortController();
      const obj = getFromStorage("notekeeper");
      if (obj && obj.token) {
        const { token: userToken, fullname: userFullname } = obj;
        axios
          .get("/users/verify?token=" + userToken)
          .then((res) => {
            if (res.data.success) {
              setToken(userToken);
              setUserId(res.data.userId);
              setFullname(userFullname);
              getNotes(res.data.userId);
            } else {
              history.push("/login");
            }
          })
          .catch((err) => {
          });
          return () => ac.abort();
      } else {
        history.push("/login");
      }
    };
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  function saveNotes(e) {
    e.preventDefault();

    const myNotes = {
      userId: userId,
      notes: notes,
    };

    axios
      .post(`/notes/update`, myNotes)
      .then((res) => {
        notify();
      })
      .catch((err) => console.log("Error : " + err));

  }

  function getNotes(userId) {
    axios
      .get(`/notes/${userId}`)
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => console.log("Error : " + err));
  }

  function logout() {

    axios
      .get("/users/logout?token=" + token)
      .then((res) => {
        if (res.data.success) {
          setToken("");
          setInStorage("notekeeper", "");
        }
      })
      .catch((err) => console.log("Error: " + err));
  }

  function addNote(note) {
    setNotes((prev) => [...prev, note]);
  }

  function deleteNote(id) {
    setNotes(notes.filter((note, index) => id !== index));
  }

  return (
    <div>
      <Header link="/login" linkText="Logout" handleClick={logout} />
      <Welcome headerText={"Welcome to NoteKeeper, " +  fullname  + "!"}  />
      <CreateArea onAdd={addNote} />

      {(notes.length > 0 || typeof notes === "undefined") &&
        notes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}

      <Footer />
      <div className="saveFab" onClick={saveNotes}>
        <Tooltip title="Save Notes" aria-label="save">
          <Fab size="large" classsName="fab" color="inherit" aria-label="save">
            <SaveIcon />
          </Fab>
        </Tooltip>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default App;
