import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createWorkOrder } from "../../managers/workOrderManager.js";
import { getAllClients } from "../../managers/clientManager.js";
import { getAllServices } from "../../managers/serviceManager.js";
import { getAllEmployees } from "../../managers/employeeManager.js";
import {  getUserProfiles } from "../../managers/userProfileManager.js"; // Import function to fetch UserProfiles

export default function CreateWorkOrder({ loggedInUser }) {
  const [userProfileId, setUserProfileId] = useState(0);
  const [employeeId, setEmployeeId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [description, setDescription] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [dateCreated] = useState(new Date().toISOString().slice(0, -1));
  const [dateCompleted, setDateCompleted] = useState(null);

  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]); // State for UserProfiles

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // console.log(e)
    e.preventDefault();
    const newWorkOrder = {
      userProfileId,
      employeeId,
      serviceId,
      description,
      emergency,
      dateCreated,
      dateCompleted,
      // Service: services.find((s) => s.id === serviceId), // Provide the Service object
      // Employee: employees.find((e) => e.id === employeeId), // Provide the Employee object
      // UserProfiles: [userProfiles.find((up) => up.id === userProfileId)] // Provide an array of UserProfile objects
    };

    createWorkOrder(newWorkOrder).then(() => {
      navigate("/workorders");
    });
  };

  useEffect(() => {
    getAllClients().then(setClients);
    getAllServices().then(setServices);
    getAllEmployees().then(setEmployees);
    getUserProfiles().then(setUserProfiles); // Fetch UserProfiles
  }, []);

  return (
    <>
      <h2>Open a Work Order</h2>
      <Form>
        <FormGroup>
          <Label>Client</Label>
          <Input
            type="select"
            value={userProfileId || ""} // Use an empty string if userProfileId is null
            onChange={(e) => {
              setUserProfileId(e.target.value ? parseInt(e.target.value) : null);
            }}
          >
            <option value="">Choose a Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Employee</Label>
          <Input
            type="select"
            value={employeeId || ""} // Use an empty string if employeeId is null
            onChange={(e) => {
              setEmployeeId(e.target.value ? parseInt(e.target.value) : null);
            }}
          >
            <option value="">Choose an Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Service</Label>
          <Input
            type="select"
            value={serviceId || ""} // Use an empty string if serviceId is null
            onChange={(e) => {
              setServiceId(e.target.value ? parseInt(e.target.value) : null);
            }}
          >
            <option value="">Choose a Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Input>
        </FormGroup>
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
          <Label>Emergency</Label>
          <Input
            type="checkbox"
            checked={emergency}
            onChange={(e) => {
              setEmergency(e.target.checked);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Completion Date</Label>
          <Input
            type="datetime-local"
            value={dateCompleted || ""}
            onChange={(e) => {
              setDateCompleted(e.target.value);
            }}
          />
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
          }  
