import React, { useEffect, useState, useContext } from "react";
import Input from "../components/Input";
import InputTextArea from "../components/InputTextArea";
import QuestionCreate from "../components/QuestionCreate";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SurveyContext } from "../context/Survey";

const SurveyCreate = () => {
  const { surveyName } = useContext(SurveyContext);
  const navigate = useNavigate();
  const { form } = Form.useForm();
  const [next, setNext] = useState(true);
  // const [surveyName, setSurveyName] = useState("");

  const [survey, setSurvey] = useState({
    formData: [],
    title: "",
    description: "",
    completionNotice: "",
  });
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    setSurvey((survey) => ({ ...survey, formData: formData }));
  }, [formData]);

  const onSubmit = () => {
    localStorage.setItem(surveyName, JSON.stringify(survey));
    navigate("/");
  };
  const [listNum, setListNum] = useState(0);
  const [questionList, setQuestionList] = useState([0]);
  const questionDelete = (listNum) => {
    console.log(questionList);
    console.log(formData);
    setQuestionList(questionList.filter((a) => a !== listNum));
    setFormData(formData.filter((a) => a.key !== listNum));
  };

  const questionCreate = () => {
    setListNum(listNum + 1);
    setQuestionList([...questionList, listNum + 1]);
  };
  console.log(questionList);
  console.log(formData);
  return (
    <div>
      <Form form={form}>
        {next ? (
          <div>
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
            <Form.Item>
              <Button
                htmlType="button"
                onClick={() => {
                  setNext(!next);
                }}
              >
                Next Page
              </Button>
            </Form.Item>
          </div>
        ) : (
          <div>
            {questionList.map((data) => {
              return (
                <QuestionCreate
                  formData={formData}
                  setFormData={setFormData}
                  questionDelete={questionDelete}
                  listNum={data}
                  key={data}
                />
              );
            })}
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  questionCreate();
                }}
              >
                +
              </Button>
            </Form.Item>
            <InputTextArea
              label={"안내 문구"}
              name={"completionNotice"}
              survey={survey}
              setSurvey={setSurvey}
            />
            <Form.Item>
              <Button type="primary" htmlType="button" onClick={onSubmit}>
                등록
              </Button>
            </Form.Item>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SurveyCreate;
