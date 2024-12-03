import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";
import AllResponses from "./components/AllResponses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormEditor />} />
        <Route path="/form/preview/:id" element={<FormPreview />} />
        <Route path="/forms/:id/responses" element={<AllResponses />} />
      </Routes>
    </Router>
  );
}

export default App;
