import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkOrderById, updateWorkOrder } from "../../managers/workOrderManager.js";
import { getAllClients } from "../../managers/clientManager.js";
import { getAllServices } from "../../managers/serviceManager.js";
import { getAllEmployees } from "../../managers/employeeManager.js";

const EditWorkOrder = ({ loggedInUser }) => {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the work order and other data
    const fetchData = async () => {
      try {
        const workOrderData = await getWorkOrderById(id);
        setWorkOrder(workOrderData);
        const clientsData = await getAllClients();
        setClients(clientsData);
        const servicesData = await getAllServices();
        setServices(servicesData);
        const employeesData = await getAllEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API call to update the work order
    updateWorkOrder(workOrder)
      .then(() => {
        navigate('/workorders');
      })
      .catch((error) => {
        console.error("Error updating work order:", error);
      });
  };

  const handleComplete = () => {
    const updatedWorkOrder = {
      ...workOrder,
      dateCompleted: workOrder.dateCompleted ? null : new Date(),
    };

    // Make an API call to update the "Complete" status
    updateWorkOrder(updatedWorkOrder)
      .then(() => {
        // Update the local state if needed
        setWorkOrder(updatedWorkOrder);
      })
      .catch((error) => {
        console.error("Error updating work order:", error);
      });
  };

  if (!workOrder || clients.length === 0 || services.length === 0 || employees.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Edit Work Order</h2>
      <Form>
        <FormGroup>
          <Label>Client</Label>
          <Input
            type="select"
            value={workOrder.userProfileId || ""}
            onChange={(e) => {
              setWorkOrder({ ...workOrder, userProfileId: e.target.value ? parseInt(e.target.value) : null });
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
            value={workOrder.employeeId || ""}
            onChange={(e) => {
              setWorkOrder({ ...workOrder, employeeId: e.target.value ? parseInt(e.target.value) : null });
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
            value={workOrder.serviceId || ""}
            onChange={(e) => {
              setWorkOrder({ ...workOrder, serviceId: e.target.value ? parseInt(e.target.value) : null });
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
            value={workOrder.description}
            onChange={(e) => {
              setWorkOrder({ ...workOrder, description: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Emergency</Label>
          <Input
            type="checkbox"
            checked={workOrder.emergency}
            onChange={(e) => {
              setWorkOrder({ ...workOrder, emergency: e.target.checked });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Complete</Label>
          <Input
            type="checkbox"
            checked={!!workOrder.dateCompleted}
            onChange={handleComplete}
          />
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
      <div>
        {workOrder.dateCompleted ? (
          <p>Status: Completed</p>
        ) : (
          <p>Status: Incomplete</p>
        )}
      </div>
    </>
  );
};

export default EditWorkOrder;
