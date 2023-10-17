import { useState } from "react";import BikeDetails from "./BikeDetails";
import ServiceList from "./ServiceList.js";
import ServiceDetails from "./ServiceDetails.js";

export default function Service() {
  const [detailsServiceId, setDetailsServiceId] = useState(null);

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <ServiceList setDetailsServiceId={setDetailsServiceId} />
        </div>
        <div className="col-sm-4">
          <ServiceDetails detailsServiceId={detailsServiceId} />
        </div>
      </div>
    </div>
  );
}