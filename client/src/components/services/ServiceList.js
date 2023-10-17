import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard.js";
import { getAllServices } from "../../managers/serviceManager.js";

export default function ServiceList({ setDetailsServiceId }) {
  const [services, setServices] = useState([]);

  const fetchServices = () => {
    getAllServices().then((data) => setServices(data));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <h2>Services</h2>
      {services.map((service) => (
        <ServiceCard
          service={service}
          setDetailsServiceId={setDetailsServiceId}
          key={`service-${service.name}`}
        ></ServiceCard>
      ))}
    </>
  );
}
