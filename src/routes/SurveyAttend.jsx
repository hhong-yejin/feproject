import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/Darkmode";
import { Button } from "antd";
import "../components/scss/surveyAttend.scss";
import { useState } from "react";

const SurveyAttend = () => {
  const navigate = useNavigate();
  const { darkModeBtn, darkModeClass } = useContext(DarkModeContext);
  // const { surveyList, setSurveyList } = useContext(SurveyContext);
  let surveyList = [];
  const setSurveyList = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const getSurvey = JSON.parse(localStorage.getItem(key));
      surveyList = surveyList.concat(getSurvey);
    }
  };
  setSurveyList();
  const getSurveyList = surveyList.map((survey, idx) => {
    return (
      <div
        className={"survey-slect-box border"}
        onClick={() => navigate(`/attend/${idx}`, { state: { key: idx } })}
        key={idx}
      >
        <h3>{survey.title}</h3>
        {survey.description}
      </div>
    );
  });
  return (
    <div className={"container " + darkModeClass}>
      <Button type="primary" onClick={() => navigate("/")}>
        뒤로가기
      </Button>
      <h1>설문 참여</h1>
      <Button type="primary" onClick={darkModeBtn}>
        darkmode
      </Button>
      <div className={"survey-select-section border"}>{getSurveyList}</div>
    </div>
  );
};

export default SurveyAttend;
