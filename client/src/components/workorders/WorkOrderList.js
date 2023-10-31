import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllWorkOrders, deleteAWorkOrder } from "../../managers/workOrderManager.js";
import { getEmployeeById } from "../../managers/employeeManager.js";
import { getServicesById } from "../../managers/serviceManager.js";
import "./WorkOrder.css";

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
    <div className="work-orders-container">
      <h2>Work Orders</h2>
      <div className="controls-container">
        <Link to="create" className="work-order-link">
          New Work Order
        </Link>
        <div className="sort-controls">
          <label className="work-order-label">Sort by:</label>
          <select className="work-order-select" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="description">Description</option>
            <option value="dateCreated">Date Created</option>
          </select>
          <select className="work-order-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <button className="work-order-button" onClick={sortWorkOrders}>
            Sort
          </button>
        </div>
      </div>
      <Table className="work-order-table">
        <thead>
          <tr>
            <th className="work-order-header">Description</th>
            <th className="work-order-header">Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((wo) => (
            <tr key={wo.id}>
              <td className="work-order-description">{wo.description}</td>
              <td className="work-order-date">{new Date(wo.dateCreated).toLocaleDateString()}</td>
              <td className="work-order-actions">
                <Button className="work-order-button" onClick={() => toggleDetails(wo.id)} color="info">
                  View Details
                </Button>
                <Link to={`edit/${wo.id}`}>
                  <Button className="work-order-button" color="warning">
                    Edit
                  </Button>
                </Link>
                <Button className="work-order-button" onClick={() => removeWorkOrder(wo.id)} color="danger">
                  Delete
                </Button>
                {expandedDetails === wo.id && (
                  <div className="work-order-details">
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
    </div>
    </>
  );
                }  
