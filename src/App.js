import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderSection from "./components/layout/Layout";
import SurveyCreate from "./routes/Create/SurveyCreate";
import SurveyAttend from "./routes/Home/SurveyAttend";
import QuestionAttend from "./routes/Attend/QuestionAttend";
import { DarkMode } from "./context/Darkmode";
import { Survey } from "./context/Survey";
function App() {
  return (
    <Survey>
      <DarkMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <HeaderSection>
            <Routes>
              <Route path="/" element={<SurveyAttend />}></Route>
              <Route path="/create" element={<SurveyCreate />}></Route>
              <Route path="/attend/:id" element={<QuestionAttend />}></Route>
            </Routes>
          </HeaderSection>
        </BrowserRouter>
      </DarkMode>
    </Survey>
  );
}

export default App;
