import React, { createContext, useState } from "react";

const SurveyContext = createContext();

const Survey = (props) => {
  const [surveyName, setSurveyName] = useState("");
  const [surveyList, setSurveyList] = useState();

  return (
    <SurveyContext.Provider
      value={{
        surveyName,
        setSurveyName,
        surveyList,
        setSurveyList,
      }}
    >
      {props.children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, Survey };
