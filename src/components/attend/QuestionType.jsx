import React from "react";
import "./styles.scss";
import { Form, Input, Select, Checkbox, DatePicker } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const QuestionType = ({ data, idx, arry }) => {
  switch (data.answer.inputType) {
    case "text":
      return (
        <div>
          <Form.Item
            hidden={arry}
            name={idx}
            key={idx}
            label={idx + 1 + ". " + data.question}
            rules={[
              {
                required: data.isRequired,
                message: `${idx + 1}번째 질문에 답변해주세요.`,
              },
            ]}
          >
            <TextArea
              allowClear
              autoSize={{ minRows: 1, maxRows: 6 }}
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
          label={idx + 1 + ". " + data.question}
          rules={[
            {
              required: data.isRequired,
              message: `${idx + 1}번째 질문에 답변해주세요.`,
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item
          hidden={arry}
          name={idx}
          key={idx}
          label={idx + 1 + ". " + data.question}
          rules={[
            {
              required: data.isRequired,
              message: `${idx + 1}번째 질문에 답변해주세요.`,
            },
          ]}
        >
          <Select placeholder="답변을 선택해주세요.">
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
          label={idx + 1 + ". " + data.question}
          rules={[
            {
              required: data.isRequired,
              message: `${idx + 1}번째 질문에 답변해주세요.`,
            },
          ]}
        >
          <Checkbox.Group placeholder="답변을 선택해주세요.(여러개 가능)">
            {data.answer.inputOptions.map((data, idx) => {
              return (
                <div>
                  <Checkbox key={idx} value={data.value}>
                    {data.label}
                  </Checkbox>
                </div>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
      );
    default:
      return null;
  }
};

export default QuestionType;
