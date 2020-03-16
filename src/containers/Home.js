import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { API } from 'aws-amplify'; 
import { LinkContainer } from 'react-router-bootstrap';
import "./Home.css";

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]); // only run the hook when props.isAuthenticated value changes
  
  function loadNotes() {
    return API.get("notes", "/notes"); // "note": name configured in API.endpoints.name at initialize AWS Amplify (index.js)
  }

  function renderNotesList(notes) {
    // [{}]: to always render the 'Create a new note' button
    return [{}].concat(notes).map((note, i) =>
      i !== 0 
        ? (
            // href
            <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
                {/* 
                    - trim(): remove whitespace at begin and end of the string
                    - split('\n'): convert string to array with return carriage (\n) delimiter and only get the 1st element [0] of the array as header 
                */}
                {/* h4 */}
                <ListGroupItem header={note.content.trim().split("\n")[0]}>
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                </ListGroupItem>
            </LinkContainer>
        ) 
        : (
            <LinkContainer key="new" to="/notes/new">
                <ListGroupItem>
                    <h4>
                        <b>{"\uFF0B"}</b> Create a new note
                    </h4>
                </ListGroupItem>
            </LinkContainer>
        )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
          {/* {!isLoading && 
            <ul>{renderNotesList(notes).map((note,i) => {
                return <li key={i}>{note}</li>
            })}</ul>
          } */}
            
          {/* {!isLoading &&
          <ul>
            {renderNotesList(notes).map((value, i) => {
                return <li key={i}>{value}</li>
            })}
          </ul>
          } */}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}