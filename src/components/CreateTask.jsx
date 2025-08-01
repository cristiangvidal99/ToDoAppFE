import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import CreateTaskForm from "./Forms/CreateTaskForm";

function CreateTask({setShowCreateTaskModal, getTask}) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Task:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTaskForm getTask={getTask} setShowCreateTaskModal={setShowCreateTaskModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTask;
