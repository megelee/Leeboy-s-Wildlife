import React, { useEffect, useState } from "react";
import { getAllClients } from "../../managers/clientManager.js";
import ClientDetails from "./ClientDetails.js";
import ClientCard from "./ClientCard.js";


export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const fetchClients = () => {
    getAllClients().then(setClients);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientCardClick = (clientId) => {
    if (selectedClientId === clientId) {
      setSelectedClientId(null);
    } else {
      setSelectedClientId(clientId);
    }
  };

  return (
    <div>
      <h2>Clients</h2>
      <div className="client-list">
        {clients.map((client) => (
          <ClientCard
            client={client}
            setDetailsClientId={handleClientCardClick}
            key={`client-${client.id}`}
          />
        ))}
      </div>

      {selectedClientId && (
        <ClientDetails
          detailsClientId={selectedClientId}
          onCloseClick={() => setSelectedClientId(null)} // Pass the onCloseClick function
        />
      )}
    </div>
  );
}
