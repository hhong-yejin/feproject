import React from "react";
import "./scss/inputTextArea.scss";
import { Form, Input } from "antd";
const { TextArea } = Input;

const InputTextArea = (props) => {
  const handleSetTextArea = (e) => {
    const { name, value } = e.target;
    props.setSurvey({ ...props.survey, [name]: value });
  };

  return (
    <div>
      <Form.Item label={props.label}>
        <TextArea
          name={props.name}
          placeholder={"설문의" + props.label + "을(를) 입력하세요!"}
          onChange={(e) => handleSetTextArea(e)}
        ></TextArea>
      </Form.Item>
    </div>
  );
};

export default InputTextArea;
