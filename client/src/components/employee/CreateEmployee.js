import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createEmployee } from "../../managers/employeeManager.js";

export default function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Address: "",
    Email: "",
    Telephone: "",
    Pay: 0, // Default pay value
    Active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEmployeeData({ ...employeeData, [name]: newValue });
  };

  const handleCreateEmployee = () => {
    // Convert employeeData to a plain JSON-serializable object
    const employeeDataJSON = {
      Name: employeeData.Name,
      Address: employeeData.Address,
      Email: employeeData.Email,
      Telephone: employeeData.Telephone,
      Pay: employeeData.Pay,
      Active: employeeData.Active,
    };

    // Now you can pass employeeDataJSON to the createEmployee function
    createEmployee(employeeDataJSON);
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
