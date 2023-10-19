import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../managers/employeeManager.js";
import EmployeeCard from "./EmployeeCard.js";
import EmployeeDetails from "./EmployeeDetails.js";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const fetchEmployees = () => {
    getAllEmployees().then(setEmployees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeCardClick = (employeeId) => {
    if (selectedEmployeeId === employeeId) {
      // If the same employee is clicked again, hide the details
      setSelectedEmployeeId(null);
    } else {
      setSelectedEmployeeId(employeeId);
    }
  };

  return (
    <div>
      <h2>Employees</h2>
      <div className="employee-list">
        {employees.map((employee) => (
          <EmployeeCard
            employee={employee}
            setDetailsEmployeeId={handleEmployeeCardClick}
            key={`employee-${employee.id}`}
          />
        ))}
      </div>

      {selectedEmployeeId && (
        <EmployeeDetails
          detailsEmployeeId={selectedEmployeeId}
          onCloseClick={() => setSelectedEmployeeId(null)} // Pass the onCloseClick function
        />
      )}
    </div>
  );
}
