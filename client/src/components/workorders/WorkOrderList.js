import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import {
  getIncompleteWorkOrders,
  getAllWorkOrders,
  updateAsComplete,
  updateWorkOrder,
  deleteAWorkOrder,
} from "../../managers/workOrderManager.js";

  
export default function WorkOrderList({ loggedInUser }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("description");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Load work orders from local storage on page load
    const storedWorkOrders = JSON.parse(localStorage.getItem("workOrders")) || [];
    setWorkOrders(storedWorkOrders);
  }, []);

  const updateLocalStorage = (updatedWorkOrders) => {
    // Update local storage with the completed status
    localStorage.setItem("workOrders", JSON.stringify(updatedWorkOrders));
  };

  const completeWorkOrder = (workOrderId) => {
    const updatedWorkOrders = workOrders.map((wo) => {
      if (wo.id === workOrderId) {
        return { ...wo, dateCompleted: new Date() };
      }
      return wo;
    });

    updateLocalStorage(updatedWorkOrders);
    setWorkOrders(updatedWorkOrders);
  };

  const removeWorkOrder = (workOrderId) => {
    deleteAWorkOrder(workOrderId).then(() => {
      getIncompleteWorkOrders().then(setWorkOrders);
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
          {/* Add other criteria as needed */}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <button onClick={sortWorkOrders}>Sort</button>
      </div>
      <Link to="/workorders/create">New Work Order</Link>
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
                <Button onClick={() => removeWorkOrder(wo.id)} color="danger">
                  Delete
                </Button>
                {!wo.dateCompleted && (
                  <Button onClick={() => completeWorkOrder(wo.id)} color="success">
                    Mark as Complete
                  </Button>
                )}
                {expandedDetails === wo.id && (
                  <div>
                    <p>Service Name: {wo.serviceId}</p>
                    <p>Employee: {wo.employeeId}</p>
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