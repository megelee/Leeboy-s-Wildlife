import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createClient } from "../../managers/clientManager.js";

export default function CreateClient() {
  const [clientData, setClientData] = useState({
    Name: "",
    Address: "",
    Email: "",
    Telephone: "",
    Active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setClientData({ ...clientData, [name]: newValue });
  };

  const handleCreateClient = () => {
    // Convert clientData to a plain JSON-serializable object
    const clientDataJSON = {
      Name: clientData.Name,
      Address: clientData.Address,
      Email: clientData.Email,
      Telephone: clientData.Telephone,
      Active: clientData.Active,
    };

    // Now you can pass clientDataJSON to the createClient function
    createClient(clientDataJSON);
  };

  return (
    <div>
      <h2>Create New Client</h2>
      <Form>
        <FormGroup>
          <Label for="Name">Name:</Label>
          <Input
            type="text"
            name="Name"
            id="Name"
            value={clientData.Name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Address">Address:</Label>
          <Input
            type="text"
            name="Address"
            id="Address"
            value={clientData.Address}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
  <Label for="Email">Email:</Label> {/* Corrected 'for' attribute */}
  <Input
    type="text"
    name="Email"
    id="Email"
    value={clientData.Email}
    onChange={handleInputChange}
  />
</FormGroup>

        <FormGroup>
          <Label for="Telephone">Telephone:</Label>
          <Input
            type="text"
            name="Telephone"
            id="Telephone"
            value={clientData.Telephone}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="Active"
              id="Active"
              checked={clientData.Active}
              onChange={handleInputChange}
            />{" "}
            Active
          </Label>
        </FormGroup>
        <Button color="primary" onClick={handleCreateClient}>
          Create Client
        </Button>
      </Form>
    </div>
  );
}
