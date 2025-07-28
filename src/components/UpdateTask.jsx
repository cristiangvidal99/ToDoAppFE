import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import UpdateTaskForm from "./Forms/UpdateTaskForm";

function UpdateTask({ selectedTask, setShowModal }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = "https://localhost:7020/Task/UpdateTask";

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("error updating task");
      }

      const data = await response.json();
      if (data != null) {
        setShowModal(false);
      }
      console.log("Task updated:", data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Task:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateTaskForm setShowModal={setShowModal} selectedTask={selectedTask} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateTask;
