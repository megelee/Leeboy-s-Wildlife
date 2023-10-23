import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createWorkOrder } from "../../managers/workOrderManager.js";
import { getAllClients } from "../../managers/clientManager.js";

export default function CreateWorkOrder({ loggedInUser }) {
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState(0);
  const [clients, setClients] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkOrder = {
      clientId,
      description,
    };

    createWorkOrder(newWorkOrder).then(() => {
      navigate("/workorders");
    });
  };

  useEffect(() => {
    getAllClients().then((clients) => {
      setClients(clients);
    });
  }, []);

  return (
    <>
      <h2>Open a Work Order</h2>
      <Form>
        <FormGroup>
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Client</Label>
          <Input
            type="select"
            value={clientId}
            onChange={(e) => {
              setClientId(parseInt(e.target.value));
            }}
          >
            <option value={0}>Choose a Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {`${client.name} - ${client.serviceType}`}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}
