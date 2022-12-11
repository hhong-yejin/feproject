import React from "react";
import { useState, useEffect } from "react";
import { Form, Select, Button } from "antd";
import "antd/dist/antd.css";
import OptionType from "./option/OptionType";
const { Option } = Select;

const Type = (props) => {
  const [change, setChange] = useState(false);
  const [answer, setAnswer] = useState({});
  const [inputOptions, setInputOptions] = useState([]);
  const [listNum, setListNum] = useState(0);

  useEffect(() => {
    props.setFormData({ ...props.formData, answer: answer });
  }, [answer]);
  useEffect(() => {
    setAnswer({ ...answer, inputOptions: inputOptions });
  }, [inputOptions]);
  const handleSetinputType = (e) => {
    if (e === "select" || e === "checkbox") {
      setChange(true);
    } else {
      setChange(false);
    }
    setAnswer({ ...answer, inputType: e });
  };
  const [option, setOption] = useState([0]);

  const optionTypeDelete = (listNum) => {
    setOption(option.filter((a) => a !== listNum));
    setInputOptions(inputOptions.filter((a) => a.key !== listNum));
  };

  const optionTypeCreate = () => {
    setListNum(listNum + 1);
    setOption([...option, listNum + 1]);
  };

  return (
    <div>
      <Form.Item
        rules={[
          {
            required: true,
            message: "답변 타입을 선택해주세요.",
          },
        ]}
        name={`inputType${props.listNum}`}
        label="답변 타입"
      >
        <Select
          name={"inputType"}
          placeholder="답변 타입을 설정해주세요!"
          onChange={handleSetinputType}
        >
          <Option value="text">text</Option>
          <Option value="date">date</Option>
          <Option value="select">select</Option>
          <Option value="checkbox">checkbox</Option>
        </Select>
      </Form.Item>
      {change ? (
        <div className="question-option-list">
          {option.map((data) => {
            return (
              <OptionType
                listNum={data}
                key={data}
                inputOptions={inputOptions}
                setInputOptions={setInputOptions}
                optionTypeDelete={optionTypeDelete}
              />
            );
          })}
          {option.length < 5 ? (
            <Form.Item className="question-box-plusbtn">
              <Button
                type="text"
                htmlType="button"
                onClick={() => optionTypeCreate()}
              >
                +
              </Button>
            </Form.Item>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Type;
