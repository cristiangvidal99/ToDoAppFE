import { Modal } from "react-bootstrap";
import { useState } from "react";
import UpdateTaskForm from "./Forms/UpdateTaskForm";

function UpdateTask({ selectedTask, setShowModal, GetTask }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Task:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateTaskForm GetTask={GetTask} setShowModal={setShowModal} selectedTask={selectedTask} />
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateTask;
