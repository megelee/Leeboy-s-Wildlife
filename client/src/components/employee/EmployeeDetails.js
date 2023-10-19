import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, Button } from "reactstrap";
import { getEmployeeById } from "../../managers/employeeManager.js";

export default function EmployeeDetails({ detailsEmployeeId, onCloseClick }) {
  const [employee, setEmployee] = useState(null);

  const getEmployeeDetails = (id) => {
    getEmployeeById(id).then(setEmployee);
  };

  useEffect(() => {
    if (detailsEmployeeId) {
      getEmployeeDetails(detailsEmployeeId);
    }
  }, [detailsEmployeeId]);

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
          <Button color="danger" onClick={onCloseClick}>
            Close
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
