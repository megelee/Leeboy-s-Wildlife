import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import { getServicesById } from "../../managers/serviceManager.js";

export default function ServiceDetails({ detailsServiceId }) {
  const [service, setService] = useState(null);

  const getServiceDetails = (id) => {
    getServicesById(id).then(setService);
  };

  useEffect(() => {
    if (detailsServiceId) {
      getServiceDetails(detailsServiceId);
    }
  }, [detailsServiceId]);

  if (!service) {
    return (
      <>
        <h2>Service Details</h2>
        <p>Please choose a service...</p>
      </>
    );
  }

  return (
    <>
      <h2>Service Details</h2>
      <Card color="dark" inverse>
        <CardBody>
          <CardTitle tag="h4">{service.name}</CardTitle>
          <p>Service Type: {service.serviceType.category}</p>
        </CardBody>
      </Card>
    </>
  );
}


