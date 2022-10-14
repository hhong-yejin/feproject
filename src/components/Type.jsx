import React from "react";
import { useState, useEffect } from "react";
import { Form, Select, Button } from "antd";
import "antd/dist/antd.css";
import OptionType from "./OptionType";
import Input from "./Input";

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

  console.log(inputOptions);
  return (
    <div>
      <Form.Item label="답변 타입">
        <Select
          placeholder="답변 타입을 설정해주세요."
          name={"inputType"}
          onChange={handleSetinputType}
        >
          <Option value="text">text</Option>
          <Option value="date">date</Option>
          <Option value="select">select</Option>
          <Option value="checkbox">checkbox</Option>
        </Select>
      </Form.Item>
      {change ? (
        <div>
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
          <Form.Item>
            <Button
              htmlType="button"
              onClick={() => {
                if (option.length < 5) {
                  optionTypeCreate();
                }
              }}
            >
              추가
            </Button>
          </Form.Item>
        </div>
      ) : null}
    </div>
  );
};

export default Type;
