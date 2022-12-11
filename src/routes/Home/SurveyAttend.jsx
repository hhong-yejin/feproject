import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "antd";
import "./styles.scss";

const SurveyAttend = () => {
  const navigate = useNavigate();

  let surveyList = [];
  const setSurveyList = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === "darkmode") continue;
      const getSurvey = JSON.parse(localStorage.getItem(key));
      surveyList = surveyList.concat(getSurvey);
    }
  };
  setSurveyList();

  const getSurveyList = surveyList.map((survey, idx) => {
    return (
      <List.Item>
        <List.Item.Meta
          title={survey.title}
          onClick={() => navigate(`/attend/${idx}`, { state: { key: idx } })}
          description={survey.description}
        />
      </List.Item>
    );
  });
  return (
    <div className={"survey-layout"}>
      <List itemLayout="horizontal">
        {getSurveyList.length !== 0 ? getSurveyList : null}
      </List>
    </div>
  );
};

export default SurveyAttend;
