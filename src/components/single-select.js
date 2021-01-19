import React, { useState } from "react";
import { surveySlice } from "../store/surveySlice";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";


function SingleSelect() {
  const {surveyId} = useParams(); 
  const dispatch = useDispatch();
  const history = useHistory();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const setOptionInArray = (value, idx) => {
    options[idx] = value;
    setOptions([...options]);
  };

  const isQuestionValid = () =>
    question.trim() === "" || options.find((opt) => opt.trim() === "") !== undefined;

  const addQuestionsOnClick = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: 'single'
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push('/create/'+surveyId+ '?clear:true');
  }

  const publishQuestions = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };
  
  return (
    <div className="question-container">
      <InputGroup className="input-grp">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Your Question"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          value={question}
        />
      </InputGroup>
      <p className="options-text">Options</p>
      <InputGroup className="input-grp">
        <Input
          placeholder="Option 1"
          value={options[0]}
          onChange={(e) => {
            setOptionInArray(e.target.value, 0);
          }}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="input-grp">
        <Input
          placeholder="Option 2"
          value={options[1]}
          onChange={(e) => {
            setOptionInArray(e.target.value, 1);
          }}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="question-buttons">
        <Button
          className="survey-main-btn"
          disabled={isQuestionValid()}
          onClick={addQuestionsOnClick}
        >
          Add Questions
        </Button>
        <Button onClick={publishQuestions} className="survey-main-btn" disabled={isQuestionValid()}>
          Publish
        </Button>
      </div>
    </div>
  );
}

export default SingleSelect;
