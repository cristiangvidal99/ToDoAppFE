import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteTask({ selectedTask, setShowModalDelete, getTask }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleSubmit = async () => {
    const url = `https://nodemigration-todoappbe.onrender.com/api/deleteTaskById/${selectedTask.id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      const data = await response;
      console.log(data);

      if (data != null) {
        setShowModalDelete(false);
        handleClose();
        getTask();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteTask;
