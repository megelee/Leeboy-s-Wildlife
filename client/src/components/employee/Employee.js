import { useState } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";

export default function Employee() {
  const [detailsEmployeeId, setDetailsEmployeeId] = useState(null);

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <EmployeeList setDetailsEmployeeId={setDetailsEmployeeId} />
        </div>
        <div className="col-sm-4">
          <EmployeeDetails detailsEmployeeId={detailsEmployeeId} />
        </div>
      </div>
    </div>
  );
}