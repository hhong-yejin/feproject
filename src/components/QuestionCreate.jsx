import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, Button, Radio } from "antd";
import Type from "./Type";

const QuestionCreate = (props) => {
  const [formData, setFormData] = useState({
    key: props.listNum,
    question: "",
    isRequired: "",
  });
  useEffect(() => {
    props.formData[props.listNum] = formData;
  }, [formData]);

  const handleSetQuestion = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div key={props.listNum}>
      <Form.Item>
        <Button
          onClick={() => {
            console.log(props.listNum);
            props.questionDelete(props.listNum);
          }}
        >
          X
        </Button>
      </Form.Item>
      <Form.Item label="질문">
        <Input
          name={"question"}
          placeholder="설문의 질문을 입력하세요!"
          onChange={(e) => handleSetQuestion(e)}
        ></Input>
      </Form.Item>
      <Form.Item label="필수 여부">
        <Radio.Group name={"isRequired"} onChange={(e) => handleSetQuestion(e)}>
          <Radio value={true}>필수</Radio>
          <Radio value={false}>선택</Radio>
        </Radio.Group>
      </Form.Item>
      <Type formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default QuestionCreate;
