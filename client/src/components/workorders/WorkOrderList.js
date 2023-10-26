import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllWorkOrders, deleteAWorkOrder } from "../../managers/workOrderManager.js";
import { getEmployeeById } from "../../managers/employeeManager.js";
import { getServicesById } from "../../managers/serviceManager.js";

export default function WorkOrderList({ loggedInUser }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("description");
  const [sortOrder, setSortOrder] = useState("asc");
  const [employeeData, setEmployeeData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [clientData, setClientData] = useState({});

  

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const newWorkOrders = await getAllWorkOrders();

        for (const workOrder of newWorkOrders) {
          const employee = await getEmployeeById(workOrder.employeeId);
          const service = await getServicesById(workOrder.serviceId);
          setEmployeeData((prevData) => ({
            ...prevData,
            [workOrder.employeeId]: employee.name,
          }));
          setServiceData((prevData) => ({
            ...prevData,
            [workOrder.serviceId]: service.name,
          }));
        }

        setWorkOrders(newWorkOrders);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      }
    };

    fetchWorkOrders();
  }, []);

  const removeWorkOrder = (workOrderId) => {
    deleteAWorkOrder(workOrderId)
      .then(() => {
        const updatedWorkOrders = workOrders.filter((wo) => wo.id !== workOrderId);
        setWorkOrders(updatedWorkOrders);
      })
      .catch((error) => {
        console.error("Error deleting work order:", error);
      });
  };

  const toggleDetails = (workOrderId) => {
    setExpandedDetails(expandedDetails === workOrderId ? null : workOrderId);
  };

  const sortWorkOrders = () => {
    const sortedWorkOrders = [...workOrders];

    sortedWorkOrders.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortCriteria].localeCompare(b[sortCriteria]);
      } else {
        return b[sortCriteria].localeCompare(a[sortCriteria]);
      }
    });

    setWorkOrders(sortedWorkOrders);
  };

  return (
    <>
      <h2>Work Orders</h2>
      <div>
        <label>Sort by:</label>
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="description">Description</option>
          <option value="dateCreated">Date Created</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <button onClick={sortWorkOrders}>Sort</button>
      </div>
      <Link to="create">New Work Order</Link>

      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((wo) => (
            <tr key={wo.id}>
              <td>{wo.description}</td>
              <td>{new Date(wo.dateCreated).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => toggleDetails(wo.id)} color="info">
                  View Details
                </Button>
                <Link to={`edit/${wo.id}`}>
                  <Button color="warning">Edit</Button>
                </Link>
                <Button onClick={() => removeWorkOrder(wo.id)} color="danger">
                  Delete
                </Button>
                {expandedDetails === wo.id && (
                  <div>
                    <p>Service Name: {serviceData[wo.serviceId]}</p>
                    <p>Employee: {employeeData[wo.employeeId]}</p>
                    <p>Date Created: {new Date(wo.dateCreated).toLocaleDateString()}</p>
                    <p>Emergency: {wo.emergency ? "Yes" : "No"}</p>
                    <p>Status: {wo.dateCompleted ? "Complete" : "Incomplete"}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
