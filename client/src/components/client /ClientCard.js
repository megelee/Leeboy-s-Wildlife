import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    Button,
  } from "reactstrap";
  
  export default function ClientCard({ client, setDetailsClientId }) {
    return (
      <Card color="dark" outline style={{ marginBottom: "4px" }}>
        <CardBody>
          <CardTitle tag="h5">{client.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          </CardSubtitle>
          <Button
      color="dark"
      onClick={() => {
        setDetailsClientId(client.id);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            View Details
          </Button>
        </CardBody>
      </Card>
    );
  }
  