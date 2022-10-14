import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import SurveyCreate from "./routes/SurveyCreate";
import SurveyAttend from "./routes/SurveyAttend";
import QuestionAttend from "./routes/QuestionAttend";
import { DarkMode } from "./context/Darkmode";
import { Survey } from "./context/Survey";
function App() {
  return (
    <Survey>
      <DarkMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/create" element={<SurveyCreate />}></Route>
            <Route path="/attend" element={<SurveyAttend />}></Route>
            <Route path="/attend/:id" element={<QuestionAttend />}></Route>
          </Routes>
        </BrowserRouter>
      </DarkMode>
    </Survey>
  );
}

export default App;
