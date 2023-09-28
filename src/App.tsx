import { Route, Routes } from "react-router-dom";

import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/projects/:projectId" element={<Tasks />} />
    </Routes>
  );
}

export default App;
