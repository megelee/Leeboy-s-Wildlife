import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createClient } from "../../managers/clientManager.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CreateClient() {
  const [clientData, setClientData] = useState({
    Name: "",
    Address: "",
    Email: "",
    Telephone: "",
    Active: true,
  });

  const navigate = useNavigate(); // Get the navigate function

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setClientData({ ...clientData, [name]: newValue });
  };

  const handleCreateClient = async () => {
    try {
      const clientDataJSON = {
        Name: clientData.Name,
        Address: clientData.Address,
        Email: clientData.Email,
        Telephone: clientData.Telephone,
        Active: clientData.Active,
      };

      // Attempt to create the client
      const createdClient = await createClient(clientDataJSON);

      // Provide feedback to the user (e.g., show a success message)
      console.log("Client created successfully:", createdClient);

      // Navigate back to the client list page
      navigate("/clients"); // Adjust the path to match your client list route
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error("Error creating client:", error);
    }
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
          <Label for="Email">Email:</Label>
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