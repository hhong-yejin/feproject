import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionType from "../../components/attend/QuestionType";
import "./styles.scss";
import { Form, Button, Steps, Input } from "antd";
import { useLocation } from "react-router-dom";
const { Step } = Steps;
const { TextArea } = Input;

const QuestionAttend = () => {
  const [next, setNext] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const key = localStorage.key(location.state.key);
  const [form] = Form.useForm();
  const getSurvey = JSON.parse(localStorage.getItem(key));
  const [formDataIdx, setFormDataIdx] = useState(0);
  const [arry, setArry] = useState(
    Array(getSurvey.formData.length).fill(true, 1)
  );
  const [current, setCurrent] = useState(formDataIdx);
  const submit = (e) => {
    if (window.confirm(getSurvey.completionNotice)) {
      navigate("/attend");
    }
  };

  const nextFocus = (e) => {
    if (formDataIdx < getSurvey.formData.length - 1) {
      e.preventDefault();
      const newArry = Array(getSurvey.formData.length).fill(true);
      newArry[formDataIdx + 1] = false;
      setArry(newArry);
      setFormDataIdx(formDataIdx + 1);
      setCurrent(formDataIdx + 1);
      return;
    }

    form.submit();
  };

  window.onkeydown = (e) => {
    if (e.key === "Enter" && e.shiftKey) return;
    if (e.key === "Enter") {
      if (next === true) setNext(!next);
      else if (next === false) nextFocus(e);
    }
  };

  let stepStatus = Array(getSurvey.formData.length).fill("wait");
  if (current === formDataIdx) {
    stepStatus[current] = "process";
  }
  for (let i = 0; i < getSurvey.formData.length; i++) {
    if (form.getFieldValue(i) !== undefined) {
      stepStatus[i] = "finish";
    }
  }
  for (let i = 0; i < getSurvey.formData.length; i++) {
    if (form.getFieldsError().length !== 0) {
      if (form.getFieldsError()[i].errors.length !== 0) {
        stepStatus[i] = "error";
      }
    }
  }
  const a = () => {
    const firstErrorKey = form
      .getFieldsError()
      .findIndex((a) => a.errors.length !== 0);
    const newArry = Array(getSurvey.formData.length).fill(true);
    newArry[firstErrorKey] = false;
    setArry(newArry);
    setFormDataIdx(firstErrorKey);
    setCurrent(firstErrorKey);
  };

  return (
    <div className="survey-layout attend-layout">
      <Form
        form={form}
        name="questionForm"
        layout="vertical"
        onFinish={submit}
        onFinishFailed={a}
      >
        {next ? (
          <div>
            <Form.Item label="설문 제목" key="title">
              <Input value={getSurvey.title} readOnly />
            </Form.Item>
            <Form.Item label="설문 설명" key="description">
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                value={getSurvey.description}
                readOnly
              />
            </Form.Item>
            <Form.Item className="attend-btn" key={key + "_next"}>
              <Button
                type="primary"
                onClick={() => {
                  setNext(!next);
                }}
              >
                다음
              </Button>
            </Form.Item>
          </div>
        ) : (
          <div>
            <Steps
              current={current}
              key={"step"}
              onChange={(formDataIdx) => {
                setFormDataIdx(formDataIdx);
                setCurrent(formDataIdx);
                const newArry = Array(getSurvey.formData.length).fill(true);
                newArry[formDataIdx] = false;
                setArry(newArry);
              }}
            >
              {getSurvey.formData.map((_, idx) => {
                return <Step status={stepStatus[idx]} key={idx} />;
              })}
            </Steps>
            {getSurvey.formData.map((data, idx) => {
              return (
                <div key={idx}>
                  <QuestionType
                    formName="questionForm"
                    arry={arry[idx]}
                    data={data}
                    idx={idx}
                    key={idx}
                    nextFocus={nextFocus}
                  />
                  {idx !== getSurvey.formData.length - 1 ? (
                    <Form.Item className="attend-btn" key={idx + "_nextBtn"}>
                      <Button
                        hidden={arry[idx]}
                        type="primary"
                        htmlType="button"
                        onClick={() => {
                          const newArry = Array(getSurvey.formData.length).fill(
                            true
                          );
                          newArry[idx + 1] = false;
                          setArry(newArry);
                          setFormDataIdx(idx + 1);
                          setCurrent(idx + 1);
                        }}
                      >
                        다음
                      </Button>
                    </Form.Item>
                  ) : (
                    <Form.Item className="attend-btn" key={idx + "_submit"}>
                      <Button
                        hidden={arry[idx]}
                        type="primary"
                        htmlType="submit"
                      >
                        제출
                      </Button>
                    </Form.Item>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {/* {next ? (
          <div>
            <Form.Item className="attend-btn" key={key + "_next"}>
              <Button
                type="primary"
                onClick={() => {
                  setNext(!next);
                }}
              >
                다음
              </Button>
            </Form.Item>
            <Form.Item label="설문 제목" key={getSurvey.title}>
              <Input value={getSurvey.title} readOnly />
            </Form.Item>
            <Form.Item label="설문 설명" key={getSurvey.description}>
              <TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                value={getSurvey.description}
                readOnly
              />
            </Form.Item>
          </div>
        ) : (
          <div>
            <Steps
              current={current}
              key={"step"}
              onChange={(formDataIdx) => {
                setFormDataIdx(formDataIdx);
                setCurrent(formDataIdx);
                const newArry = Array(getSurvey.formData.length).fill(true);
                newArry[formDataIdx] = false;
                setArry(newArry);
              }}
            >
              {getSurvey.formData.map((data, idx) => {
                return <Step status={stepStatus[idx]} key={idx} />;
              })}
            </Steps>
            {getSurvey.formData.map((data, idx) => {
              return (
                <div key={idx}>
                  <QuestionType
                    formName="questionForm"
                    arry={arry[idx]}
                    data={data}
                    idx={idx}
                    key={idx}
                  />
                  {idx !== getSurvey.formData.length - 1 ? (
                    <Form.Item className="attend-btn" key={idx + "_nextBtn"}>
                      <Button
                        hidden={arry[idx]}
                        type="primary"
                        htmlType="button"
                        onClick={() => {
                          const newArry = Array(getSurvey.formData.length).fill(
                            true
                          );
                          newArry[idx + 1] = false;
                          setArry(newArry);
                          setFormDataIdx(idx + 1);
                          setCurrent(idx + 1);
                        }}
                      >
                        다음
                      </Button>
                    </Form.Item>
                  ) : (
                    <Form.Item className="attend-btn" key={idx + "_submit"}>
                      <Button
                        hidden={arry[idx]}
                        type="primary"
                        htmlType="submit"
                      >
                        제출
                      </Button>
                    </Form.Item>
                  )}
                </div>
              );
            })}
          </div>
        )} */}
      </Form>
    </div>
  );
};

export default QuestionAttend;
