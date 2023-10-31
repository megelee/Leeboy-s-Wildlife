import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import "./Service.css"; // Import the CSS file

export default function ServiceCard({ service }) {
  return (
    <Card className="card" outline style={{ marginBottom: "20px" }}>
      <CardBody>
        <CardTitle className="card-title" tag="h5">
          {service.name}
        </CardTitle>
        <CardSubtitle className="card-subtitle" tag="h6">
          {service.description}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}
