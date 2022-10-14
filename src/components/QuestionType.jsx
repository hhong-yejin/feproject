import React, { useContext } from "react";
import { SurveyContext } from "../context/Survey";
import { Form, Input, Select, Checkbox, DatePicker } from "antd";
const { Option } = Select;

const QuestionType = ({ data, idx, arry }) => {
  const { inputRef } = useContext(SurveyContext);
  switch (data.answer.inputType) {
    case "text":
      return (
        <div>
          <Form.Item
            hidden={arry}
            name={idx}
            key={idx}
            label={idx + 1 + "." + data.question}
            rules={[
              {
                required: data.isRequired,
                message: `${idx + 1}번째 질문에 답변해주세요.`,
              },
            ]}
          >
            <Input
              ref={(f) => (inputRef.current[idx] = f)}
              type="text"
              placeholder="질문에 답변해주세요."
            />
          </Form.Item>
        </div>
      );
    case "date":
      return (
        <Form.Item
          hidden={arry}
          name={idx}
          key={idx}
          label={idx + 1 + "." + data.question}
          rules={[
            {
              required: data.isRequired,
              message: `${idx + 1}번째 질문에 답변해주세요.`,
            },
          ]}
        >
          <DatePicker ref={(f) => (inputRef.current[idx] = f)} />
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item
          hidden={arry}
          name={idx}
          key={idx}
          label={idx + 1 + "." + data.question}
          rules={[
            {
              required: data.isRequired,
              message: `${idx + 1}번째 질문에 답변해주세요.`,
            },
          ]}
        >
          <Select
            ref={(f) => (inputRef.current[idx] = f)}
            placeholder="답변을 선택해주세요."
          >
            {data.answer.inputOptions.map((data, idx) => {
              return (
                <Option key={idx} value={data.value}>
                  {data.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    case "checkbox":
      return (
        <Form.Item
          hidden={arry}
          name={idx}
          key={idx}
          label={idx + 1 + "." + data.question}
          rules={[
            {
              required: data.isRequired,
              message: `${idx + 1}번째 질문에 답변해주세요.`,
            },
          ]}
        >
          <Checkbox.Group
            ref={(f) => (inputRef.current[idx] = f)}
            placeholder="답변을 선택해주세요.(여러개 가능)"
          >
            {data.answer.inputOptions.map((data, idx) => {
              return (
                <Checkbox key={idx} value={data.value}>
                  {data.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
      );
    default:
      return <h1>dd</h1>;
  }
};

export default QuestionType;
