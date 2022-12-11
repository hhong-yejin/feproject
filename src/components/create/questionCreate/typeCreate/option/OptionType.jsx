import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";

const OptionType = (props) => {
  const [inputOption, setInputOption] = useState({
    key: props.listNum,
    label: "",
    value: "",
  });

  useEffect(() => {
    props.inputOptions[props.listNum] = inputOption;
  }, [inputOption]);

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setInputOption({ ...inputOption, [name]: value });
  };

  return (
    <div className="question-box question-option-box">
      <Form.Item className="question-box-delbtn">
        <Button
          type="text"
          htmlType="button"
          onClick={() => {
            props.optionTypeDelete(props.listNum);
          }}
        >
          X
        </Button>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "옵션의 label를 입력하세요.",
          },
        ]}
        name={`label${props.listNum}`}
        label="label"
      >
        <Input
          name="label"
          placeholder="옵션의 label를 입력하세요!"
          onChange={(e) => handleSetValue(e)}
        ></Input>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "옵션의 label를 입력하세요.",
          },
        ]}
        name={`value${props.listNum}`}
        label="value"
      >
        <Input
          name="value"
          placeholder="옵션의 실제 입력되는 값을 입력하세요!"
          onChange={(e) => handleSetValue(e)}
        ></Input>
      </Form.Item>
    </div>
  );
};

export default OptionType;
