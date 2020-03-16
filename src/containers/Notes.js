import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import config from '../config';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { s3Upload, s3Remove } from '../libs/awsLib';
import './Notes.css';

export default function Notes(props) {
  const file = useRef(null); // useRef: store the file but does not re-render
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${props.match.params.id}`); // "note": name configured in API.endpoints.name at initialize AWS (index.js)
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]); // useEffect hook runs at load and reruns on params.id changes

  function validateForm() {
    return content.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, ""); // format the attachment URL using formatFilename by stripping the timestamp we had added to the filename while uploading it.
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  async function removeAttachment(file) {
    await s3Remove(file); // remove the former attachment. Note: the API returns {} regardless file exists or not
  }

  function saveNote(note) {
    return API.put("notes", `/notes/${props.match.params.id}`, { // "note": name configured in API.endpoints.name at initialize AWS Amplify (index.js)
      body: note
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      if (file.current) {
        attachment = await s3Upload(file.current); // upload to S3 storage
        removeAttachment(note.attachment); // remove former attachment from storage (S3)
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment
      });

      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteNote() {
    return API.del("notes", `/notes/${props.match.params.id}`); // "note": name configured in API.endpoints.name at initialize AWS Amplify (index.js)
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteNote();
      removeAttachment(note.attachment); // remove former attachment from storage (S3)
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
    {/* render only when the note state variable is set */}
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {note.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  /**
                    SEO
                    - noopener: prevents the opening page to gain any kind of access of the original page
                    - noreferrer: prevents passing the referrer information to the target website by removing the referral info from the HTTP header. This means that in Google analytics traffic coming from links that have the rel=”noreferrer” attribute will show as Direct Traffic instead of Referral.
                   */   
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
} 