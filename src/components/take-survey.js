import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

function TakeSurvey() {
  const surveyIds = useSelector((globalStore) =>
    globalStore.surveys.filter((s) => s.isPublished).map((s) => s.surveyId)
  );

  return (
    <>
      {surveyIds.map((id) => (
        <Button className="survey-main-btn" key={id}>
          Take Survey {id}
        </Button>
      ))}
    </>
  );
}

export default TakeSurvey;
