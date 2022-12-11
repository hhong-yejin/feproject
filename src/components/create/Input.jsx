import React, { useContext } from "react";
import { Form, Input } from "antd";
import { SurveyContext } from "../../context/Survey";

const InputBox = (props) => {
  const { setSurveyName } = useContext(SurveyContext);
  const handleSetTitle = (e) => {
    const { name, value } = e.target;
    props.setSurvey({ ...props.survey, [name]: value });
    if (name === "title") {
      setSurveyName(value);
    }
  };
  return (
    <div>
      <Form.Item
        rules={[
          {
            required: true,
            message: props.label + "을(를) 입력해주세요.",
          },
        ]}
        name={props.name}
        label={props.label}
        className="question-box"
      >
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
