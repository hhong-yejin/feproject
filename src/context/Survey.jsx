import React, { createContext, useRef, useState } from "react";

const SurveyContext = createContext();

const Survey = (props) => {
  const [surveyName, setSurveyName] = useState("");
  const [surveyList, setSurveyList] = useState();
  const inputRef = useRef([]);

  return (
    <SurveyContext.Provider
      value={{
        surveyName,
        setSurveyName,
        surveyList,
        setSurveyList,
        inputRef,
      }}
    >
      {props.children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, Survey };
