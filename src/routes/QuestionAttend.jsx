import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/scss/surveyAttend.scss";
// import QuestionDescription from "../components/QuestionDescription";
import QuestionType from "../components/QuestionType";
import { DarkModeContext } from "../context/Darkmode";
// import { SurveyContext } from "../context/Survey";
import { Form, Button, Steps } from "antd";
import { useLocation } from "react-router-dom";
const { Step } = Steps;

const QuestionAttend = () => {
  const { darkModeClass, darkModeBtn } = useContext(DarkModeContext);
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
      window.location.replace("/attend");
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
    } else {
      form.submit();
    }
  };

  window.onkeydown = (e) => {
    if (e.key === "Enter") {
      if (next === true) {
        setNext(!next);
      } else if (next === false) {
        nextFocus(e);
        console.log(e);
      }
    }
  };

  let tm = null;
  const autoNext = () => {
    clearTimeout(tm);
    tm = setTimeout(() => {
      if (formDataIdx < getSurvey.formData.length - 1) {
        const newArry = Array(getSurvey.formData.length).fill(true);
        newArry[formDataIdx + 1] = false;
        setArry(newArry);
        setFormDataIdx(formDataIdx + 1);
        setCurrent(formDataIdx + 1);
      } else {
        form.submit();
      }
    }, 3000);
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
    console.log(firstErrorKey);
    const newArry = Array(getSurvey.formData.length).fill(true);
    newArry[firstErrorKey] = false;
    setArry(newArry);
    setFormDataIdx(firstErrorKey);
    setCurrent(firstErrorKey);
  };

  return (
    <div className={"container " + darkModeClass}>
      <Button type="primary" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
      <Button type="primary" onClick={darkModeBtn}>
        darkmode
      </Button>
      <div className={"survey-list-section border"}>
        {next ? <h1>설문 확인</h1> : <h1>설문 입력</h1>}
        <Form
          form={form}
          name="questionForm"
          onFinish={submit}
          onFinishFailed={a}
          onValuesChange={autoNext}
        >
          {next ? (
            <div>
              <Form.Item label="설문 제목 : " key={getSurvey.title}>
                <span className="ant-form-text">{getSurvey.title}</span>
              </Form.Item>
              <Form.Item label="설문 설명 : " key={getSurvey.description}>
                <span className="ant-form-text">{getSurvey.description}</span>
              </Form.Item>
              <Form.Item key={key + "_next"}>
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
                      <Form.Item key={idx + "_nextBtn"}>
                        <Button
                          hidden={arry[idx]}
                          type="primary"
                          htmlType="button"
                          onClick={() => {
                            const newArry = Array(
                              getSurvey.formData.length
                            ).fill(true);
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
                      <Form.Item key={idx + "_submit"}>
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
        </Form>
      </div>
    </div>
  );
};

export default QuestionAttend;
