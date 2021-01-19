import React, { useState } from "react";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { surveySlice } from "../store/surveySlice";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function MultiSelect() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const addOptions = (idx) => {
    if (options.length < 4) {
      options.splice(idx + 1, 0, "");
      setOptions([...options]);
    }
  };
  const removeOption = (idx) => {
    if (options.length > 1) {
      options.splice(idx, 1);
      setOptions([...options]);
    }
  };
  const setOptionInArray = (value, idx) => {
    options[idx] = value;
    setOptions([...options]);
  };
  const isQuestionValid = () =>
    question.trim() === "" ||
    options.find((opt) => opt.trim() === "") !== undefined;

  const addQuestionsOnClick = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear:true");
  };

  const publishQuestions = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };

  return (
    <div>
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
        {options.map((option, optionIdx) => (
          <InputGroup className="input-grp" key={optionIdx}>
            <Input
              placeholder={`Option ${optionIdx + 1}`}
              value={option}
              onChange={(e) => setOptionInArray(e.target.value, optionIdx)}
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={() => addOptions(optionIdx)}
                disabled={options.length === 4}
              >
                +
              </Button>
              <Button
                onClick={() => removeOption(optionIdx)}
                disabled={options.length === 1}
              >
                -
              </Button>
            </InputGroupAddon>
          </InputGroup>
        ))}
        {options.length === 4 ? (
          <div className="question-buttons">
            <Button
              className="survey-main-btn"
              onClick={addQuestionsOnClick}
              disabled={isQuestionValid()}
            >
              Add Questions
            </Button>
            <Button
              className="survey-main-btn"
              onClick={publishQuestions}
              disabled={isQuestionValid()}
            >
              Publish
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MultiSelect;
