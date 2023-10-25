import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import {
  getIncompleteWorkOrders,
  deleteAWorkOrder,
  updateWorkOrder,
  getAllWorkOrders,
} from "../../managers/workOrderManager.js";

export default function WorkOrderList({ loggedInUser }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("description");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingDetails, setEditingDetails] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    // Define an async function to fetch work orders and handle updates
    const fetchWorkOrders = async () => {
      try {
        const newWorkOrders = await getAllWorkOrders(); // Fetch new work orders

        // Update local storage and state with the new work orders
        updateLocalStorage(newWorkOrders);
        setWorkOrders(newWorkOrders);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      }
    };

    // Call the async function to fetch and update work orders
    fetchWorkOrders();
  }, []);

  const updateLocalStorage = (updatedWorkOrders) => {
    localStorage.setItem("workOrders", JSON.stringify(updatedWorkOrders));
  };

  const removeWorkOrder = (workOrderId) => {
    deleteAWorkOrder(workOrderId)
      .then(() => {
        // Update local storage with the updated work orders
        const updatedWorkOrders = workOrders.filter((wo) => wo.id !== workOrderId);
        updateLocalStorage(updatedWorkOrders);
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

  const editWorkOrder = (workOrderId) => {
    setEditingDetails(workOrderId);
  };

  const saveWorkOrder = (workOrderId, updatedWorkOrderData) => {
    updateWorkOrder(workOrderId, updatedWorkOrderData)
      .then(() => {
        getIncompleteWorkOrders().then((updatedWorkOrders) => {
          setWorkOrders(updatedWorkOrders);
          setEditingDetails(null);
        });
      })
      .catch((error) => {
        console.error("Error updating work order:", error);
      });
  };

  const cancelEdit = () => {
    setEditingDetails(null);
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
                <Button onClick={() => editWorkOrder(wo.id)} color="primary">
                  Edit
                </Button>
                <Button onClick={() => removeWorkOrder(wo.id)} color="danger">
                  Delete
                </Button>
                {editingDetails === wo.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <Button onClick={() => saveWorkOrder(wo.id, { description: editedDescription })} color="success">
                      Save
                    </Button>
                    <Button onClick={cancelEdit} color="secondary">
                      Cancel
                    </Button>
                  </div>
                ) : null}
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
