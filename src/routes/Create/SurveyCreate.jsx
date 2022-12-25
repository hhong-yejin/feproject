import React, { useEffect, useState, useContext } from "react";
import Input from "../../components/create/Input";
import InputTextArea from "../../components/create/InputTextArea";
import QuestionCreate from "../../components/create/questionCreate/QuestionCreate";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SurveyContext } from "../../context/Survey";
import "./styles.scss";

const SurveyCreate = () => {
  const { surveyName } = useContext(SurveyContext);
  const navigate = useNavigate();
  const { form } = Form.useForm();
  const [listNum, setListNum] = useState(0);
  const [questionList, setQuestionList] = useState([0]);
  const [formData, setFormData] = useState([]);
  const [survey, setSurvey] = useState({
    formData: [],
    title: "",
    description: "",
    completionNotice: "",
  });

  useEffect(() => {
    setSurvey((survey) => ({ ...survey, formData: formData }));
  }, [formData]);

  const onFinish = (e) => {
    localStorage.setItem(surveyName, JSON.stringify(survey));
    navigate("/");
  };

  const questionDelete = (listNum) => {
    setQuestionList(questionList.filter((a) => a !== listNum));
    setFormData(formData.filter((a) => a.key !== listNum));
  };
  console.log(formData);
  const questionCreate = () => {
    setListNum(listNum + 1);
    setQuestionList([...questionList, listNum + 1]);
  };

  return (
    <div className="survey-layout">
      <Form
        form={form}
        name="create-survey"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Input
          label={"제목"}
          name={"title"}
          survey={survey}
          setSurvey={setSurvey}
        />
        <InputTextArea
          label={"설명"}
          name={"description"}
          survey={survey}
          setSurvey={setSurvey}
        />
        {questionList.map((data, idx) => {
          return (
            <QuestionCreate
              formData={formData}
              setFormData={setFormData}
              questionDelete={questionDelete}
              listNum={data}
              idx={idx}
              key={data}
            />
          );
        })}
        <InputTextArea
          label={"안내 문구"}
          name={"completionNotice"}
          survey={survey}
          setSurvey={setSurvey}
        />
        <Form.Item className="survey-btns">
          <Button className="survey-btn" type="primary" htmlType="submit">
            등록
          </Button>
          <Button type="primary" onClick={questionCreate}>
            항목 추가
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SurveyCreate;
