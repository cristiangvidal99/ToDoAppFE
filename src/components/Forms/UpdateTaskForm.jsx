import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateTaskForm({ selectedTask, setShowModal }) {
  const [startDate, setStartDate] = useState(new Date());
  
  const [form, setForm] = useState({
    id: selectedTask.id,
    title: selectedTask.title,
    description: selectedTask.description,
    priority: selectedTask.priority,
    date: selectedTask.date,
  });


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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log(form);
  
  return (
    <Form>
      {/* Title */}
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={form.title}
          placeholder="Enter title"
          onChange={handleInputChange}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          name="description"
          value={form.description}
          onChange={handleInputChange}
        />
      </Form.Group>

      {/* Priority */}
      <Form.Group className="mb-3" controlId="formBasicPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          aria-label="Select priority"
          name="priority"
          value={form.priority}
          onChange={handleInputChange}
        >
          <option value="">Select priority</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </Form.Select>
      </Form.Group>

      {/* Date */}
      <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicDate">
        <Form.Label>Date</Form.Label>
        <DatePicker
          className="w-100"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setForm({
              ...form,
              date: date.toISOString(),
            });
          }}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={(event) => handleFormSubmit(event)}
      >
        Submit
      </Button>
    </Form>
  );
}

export default UpdateTaskForm;
