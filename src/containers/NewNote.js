import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from 'aws-amplify';
import { s3Upload } from '../libs/awslib';
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";

export default function NewNote(props) {
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    // console.log('event',event.target.files[0]);
    /*
    name: "Screen Shot 2020-03-13 at 16.11.18.png"
    lastModified: 1584130284183
    lastModifiedDate: Fri Mar 13 2020 16:11:24 GMT-0400 (Eastern Daylight Time) {}
    webkitRelativePath: ""
    size: 398016
    type: "image/png"
    */
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // size: in KB
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try{
      const attachment = file.current
        ? await s3Upload(file.current) // upload to S3 storage
        : null;
      // console.log('attachment',attachment); // 1584207093094-Screen Shot 2020-03-13 at 16.11.18.png
      // console.log('content',content); // test1
      // const noteCreated = await createNote({ content, attachment });
      await createNote({ content, attachment });
      // console.log('noteCreated: ', noteCreated);
      /*
      userId: "us-east-1:1e53ffa8-46b9-4490-a870-2a9030ef8e33"
      noteId: "21698aa0-6616-11ea-98c7-3d6086e6388a"
      content: "test1"
      createdAt: 1584205582410
      */
      props.history.push('/');
    }catch(e){
      console.log(e);
      setIsLoading(false);
    }
  }

  function createNote(note){
    // console.log('note',note);
    /*
    content: "test1"
    attachment: "1584207093094-Screen Shot 2020-03-13 at 16.11.18.png"
    */

    /**
     * - 'notes': name configured in API.endpoints.name at initialize AWS Amplify (index.js)
     * - see 4.Building a Serverless REST API - 1.1.Add a Create Note API
     * - POST to https://t27xi9i6pl.execute-api.us-east-1.amazonaws.com/prod/notes
     * - trigger main() in /Users/Chinh/Dev/Lab/serverless-stack.com/notes-app-api/create.js
     *    - write to DynamoDB: await dynamoDbLib.call("put", params){...}
     *      - Lambda > Functions > notes-app-api-prod-create > create.js - main()
     *    - example (item in DynamoDB):
     *        attachmentString:	1584207093094-Screen Shot 2020-03-13 at 16.11.18.png
              contentString:	test1	
              createdAtNumber:	1584207099008	
              noteIdString:	a9600800-6619-11ea-95cd-6f48ed04e5c8	
              userIdString:	us-east-1:1e53ffa8-46b9-4490-a870-2a9030ef8e33
     */
    return API.post('notes', '/notes', { // 
      body: note
    })
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
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
          Create
        </LoaderButton>
      </form>
    </div>
  );
}