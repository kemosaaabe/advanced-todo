import { Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";

import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route
        path="/projects/:projectId"
        element={
          <DndProvider backend={HTML5Backend}>
            <Tasks />
          </DndProvider>
        }
      />
    </Routes>
  );
}

export default App;
