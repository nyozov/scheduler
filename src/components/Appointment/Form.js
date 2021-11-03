import React, { useState } from 'react';


import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function(props){
  const { student, interviewer, interviewers, onSave, onCancel } = props;
  const [studentName, setStudent] = useState(student || "");
const [interviewerName, setInterviewer] = useState(interviewer || null);
const [error, setError] = useState("");
const reset = () => {
  setStudent('');
  setInterviewer(null);
}
const cancel = () =>{
  reset();
  onCancel();
}
function validate() {
  if (studentName === "") {
    setError("Student name cannot be blank");
    return;
  }
  setError("")
  props.onSave(studentName, interviewerName);
}


  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={event => setStudent(event.target.value)}
        value={studentName}
        data-testid="student-name-input"

      
      />
       <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
      interviewers={interviewers}
      value={interviewerName}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => validate()}>Save</Button>
    </section>
  </section>
</main>
  )
}