import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, Button } from "reactstrap";
import { getClientById } from "../../managers/clientManager.js";

export default function ClientDetails({ detailsClientId, onCloseClick }) {
  const [client, setClient] = useState(null);

  const getClientDetails = (id) => {
    getClientById(id).then(setClient);
  };

  useEffect(() => {
    if (detailsClientId) {
      getClientDetails(detailsClientId);
    }
  }, [detailsClientId]);

  if (!client) {
    return (
      <>
        <h2>Client Details</h2>
        <Button color="danger" onClick={onCloseClick}>
          Close
        </Button>
      </>
    );
  }

  return (
    <>
      <h2>Client Details</h2>
      <Card color="dark" inverse>
        <CardBody>
          <CardTitle tag="h4">{client.name}</CardTitle>
          <p>Address: {client.address}</p>
          <p>Email: {client.email}</p>
          <p>Phone: {client.telephone}</p>
          <Button color="danger" onClick={onCloseClick}>
            Close
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
