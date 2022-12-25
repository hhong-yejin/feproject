import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, Button, Radio } from "antd";
import Type from "./typeCreate/Type";
import "./styles.scss";

const QuestionCreate = (props) => {
  const [formData, setFormData] = useState({
    key: props.listNum,
    question: "",
    isRequired: "",
  });
  useEffect(() => {
    props.formData[props.idx] = formData;
  }, [formData]);

  const handleSetQuestion = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div key={props.listNum} className="question-box">
      <Form.Item className="question-box-delbtn">
        <Button
          type="text"
          onClick={() => {
            props.questionDelete(props.listNum);
          }}
        >
          X
        </Button>
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "설문의 질문을 입력해주세요." }]}
        label="질문"
        name={`question${props.listNum}`}
      >
        <Input
          name={"question"}
          placeholder="설문의 질문을 입력하세요!"
          onChange={(e) => handleSetQuestion(e)}
        ></Input>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "필수 여부를 선택해주세요.",
          },
        ]}
        name={`isRequired${props.listNum}`}
        label="필수 여부"
      >
        <Radio.Group name={"isRequired"} onChange={(e) => handleSetQuestion(e)}>
          <Radio value={true}>필수</Radio>
          <Radio value={false}>선택</Radio>
        </Radio.Group>
      </Form.Item>
      <Type
        listNum={props.listNum}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default QuestionCreate;
