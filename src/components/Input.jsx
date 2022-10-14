import React, { useContext } from "react";
import { Form, Input } from "antd";
import { SurveyContext } from "../context/Survey";

const InputBox = (props) => {
  const { surveyName, setSurveyName } = useContext(SurveyContext);
  const handleSetTitle = (e) => {
    const { name, value } = e.target;
    props.setSurvey({ ...props.survey, [name]: value });
    if (name === "title") {
      setSurveyName(value);
    }
  };
  return (
    <div>
      <Form.Item label={props.label}>
        <Input
          name={props.name}
          placeholder={"설문의" + props.label + "을(를) 입력하세요!"}
          onChange={(e) => handleSetTitle(e)}
        ></Input>
      </Form.Item>
    </div>
  );
};

export default InputBox;
