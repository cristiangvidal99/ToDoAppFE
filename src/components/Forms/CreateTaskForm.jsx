import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTaskForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    date: new Date().toISOString()
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = "https://localhost:7020/Task/CreateTask";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      const data = await response.json();
      console.log("Tarea creada:", data);
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

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

export default CreateTaskForm;
