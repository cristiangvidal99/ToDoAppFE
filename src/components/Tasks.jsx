import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
import GetPriorityName from "../helpers/GetPriorityName"
import CreateTask from "./CreateTask";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const GetTask = () => {
    return fetch("https://localhost:7020/Task/GetAllTasks")
      .then((response) => response.json())
      .then((json) => setTasks(json))
      .catch((error) => console.error("Error fetching task:", error));
  };

  const FormatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  };

  useEffect(() => {
    GetTask();
  }, []);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowCreateTaskModal(!showCreateTaskModal)}
      >
        Create Task
      </button>
      <Table striped className="w-75 mx-auto mt-5 border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{FormatDate(task.date)}</td>
              <td>{GetPriorityName(parseInt(task.priority))}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowModalDelete(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && selectedTask && (
        <UpdateTask
          setShowModal={setShowModal}
          selectedTask={selectedTask}
          GetTask={GetTask}
        />
      )}
      {showCreateTaskModal && <CreateTask getTask={GetTask} setShowCreateTaskModal={setShowCreateTaskModal} />}

      {showModalDelete && selectedTask && (
        <DeleteTask selectedTask={selectedTask} setShowModalDelete={setShowModalDelete} getTask={GetTask} />
      )}
    </>
  );
}

export default Tasks;
