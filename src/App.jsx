import { useState } from "react";
import Tasks from "./components/Tasks";
import CreateTask from "./components/CreateTask";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <div className="container-fluid">
        <h1 className="text-center text-bold">Task Manager</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(!showModal)}
        >
          Create Task
        </button>
        {showModal && <CreateTask />}
        <Tasks />
      </div>
    </div>
  );
}

export default App;
