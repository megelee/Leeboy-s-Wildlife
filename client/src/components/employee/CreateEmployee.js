import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createEmployee } from "../../managers/employeeManager.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Address: "",
    Email: "",
    Telephone: "",
    Pay: 0, // Default pay value
    Active: true,
  });

  const navigate = useNavigate(); // Get the navigate function

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEmployeeData({ ...employeeData, [name]: newValue });
  };

  const handleCreateEmployee = async () => {
    try {
      const employeeDataJSON = {
        Name: employeeData.Name,
        Address: employeeData.Address,
        Email: employeeData.Email,
        Telephone: employeeData.Telephone,
        Pay: employeeData.Pay,
        Active: employeeData.Active,
      };

      // Attempt to create the employee
      const createdEmployee = await createEmployee(employeeDataJSON);

      // Provide feedback to the user (e.g., show a success message)
      console.log("Employee created successfully:", createdEmployee);

      // Navigate back to the employee list page
      navigate("/employees"); // Adjust the path to match your employee list route
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <h2>Create New Employee</h2>
      <Form>
        <FormGroup>
          <Label for="Name">Name:</Label>
          <Input
            type="text"
            name="Name"
            id="Name"
            value={employeeData.Name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Address">Address:</Label>
          <Input
            type="text"
            name="Address"
            id="Address"
            value={employeeData.Address}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email:</Label>
          <Input
            type="text"
            name="Email"
            id="Email"
            value={employeeData.Email}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Telephone">Telephone:</Label>
          <Input
            type="text"
            name="Telephone"
            id="Telephone"
            value={employeeData.Telephone}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Pay">Pay:</Label>
          <Input
            type="number"
            name="Pay"
            id="Pay"
            value={employeeData.Pay}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="Active"
              id="Active"
              checked={employeeData.Active}
              onChange={handleInputChange}
            />{" "}
            Active
          </Label>
        </FormGroup>
        <Button color="primary" onClick={handleCreateEmployee}>
          Create Employee
        </Button>
      </Form>
    </div>
  );
}
