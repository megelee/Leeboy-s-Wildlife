import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, Button } from "reactstrap";
import { getEmployeeById, deactivateEmployee } from "../../managers/employeeManager.js";

export default function EmployeeDetails({ detailsEmployeeId, onCloseClick }) {
  const [employee, setEmployee] = useState(null);
  const [isActive, setIsActive] = useState(true); // Add a state for "Active" status

  const getEmployeeDetails = (id) => {
    getEmployeeById(id).then((data) => {
      setEmployee(data);
      setIsActive(data.active); // Initialize "isActive" state
    });
  };

  useEffect(() => {
    if (detailsEmployeeId) {
      getEmployeeDetails(detailsEmployeeId);
    }
  }, [detailsEmployeeId]);

  const handleDeactivateClick = () => {
    if (employee) {
      deactivateEmployee(employee.id)
        .then(() => {
          // Handle successful deactivation
          // Update the local state to reflect the deactivation
          setIsActive(false);
        })
        .catch((error) => {
          console.error("Error deactivating employee:", error);
          // Handle the error, e.g., show an error message.
        });
    }
  };

  if (!employee) {
    return (
      <>
        <h2>Employee Details</h2>
        <Button color="danger" onClick={onCloseClick}>
          Close
        </Button>
      </>
    );
  }

  return (
    <>
      <h2>Employee Details</h2>
      <Card color="dark" inverse>
        <CardBody>
          <CardTitle tag="h4">{employee.name}</CardTitle>
          <p>Address: {employee.address}</p>
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.telephone}</p>
          <p>Pay: {employee.pay}</p>
          <p>Active: {isActive ? "Yes" : "No"}</p> {/* Use the "isActive" state */}
          <Button color="danger" onClick={handleDeactivateClick}>
            Deactivate
          </Button>
          <Button color="danger" onClick={onCloseClick}>
            Close
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
