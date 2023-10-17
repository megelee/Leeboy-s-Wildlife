import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
  } from "reactstrap";
  
  export default function ServiceCard({ service }) {
    return (
      <Card color="dark" outline style={{ marginBottom: "4px" }}>
        <CardBody>
          <CardTitle tag="h5">{service.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {service.description} 
          </CardSubtitle>
        </CardBody>
      </Card>
    );
  }
  