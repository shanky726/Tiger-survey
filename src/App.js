import logo from "./logo.png";
import { Button } from "reactstrap";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import CreateSurvey from "./components/Create-survey";
import { createSurvey } from "./store/surveySlice";
import TakeSurvey from "./components/take-survey";
import ConfirmSurvey from './components/confirm-survey'
import { useDispatch } from "react-redux";
import "./App.css";
import { unwrapResult } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirect = () => {
    dispatch(createSurvey())
      .then(unwrapResult)
      .then((id) => history.push("/create/" + id));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/create/:surveyId">
          <CreateSurvey />
        </Route>
        <Route path="/confirm/:surveyId">
          <ConfirmSurvey />
        </Route>
        <Route path="/take">
          <TakeSurvey />
        </Route>
        <Route path="/">
          <Button className="survey-main-btn" onClick={redirect}>
            Create Survey
          </Button>
          <Link to="/take">
            <Button className="survey-main-btn">Take Survey</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
