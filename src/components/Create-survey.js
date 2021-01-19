import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MultiSelect from "./multi-select";
import SingleSelect from "./single-select";

function CreateSurvey() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropDownText, setDropDownText] = useState("Select Question Type");
  const { surveyId } = useParams();
  const history = useHistory();
  const query = useLocation().search;
  console.log(query);

  useEffect(() => {
    if (query === "?clear:true") {
      setDropDownText("Select Question Type");
      history.push("/create/" + surveyId);
    }
  }, [query, history, surveyId]);

  return (
    <>
      <p>Survey Id: {surveyId}</p>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{dropDownText}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              setDropDownText("Multi Select Questions");
            }}
          >
            Multi Select Questions
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setDropDownText("Single Select Questions");
            }}
          >
            Single Select Questionst
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {dropDownText === "Multi Select Questions" ? <MultiSelect /> : null}
      {dropDownText === "Single Select Questions" ? <SingleSelect /> : null}
    </>
  );
}

export default CreateSurvey;
