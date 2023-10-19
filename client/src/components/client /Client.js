import { useState } from "react";
import ClientList from "./ClientList";
import ClientDetails from "./ClientDetails";

export default function Client() {
  const [detailsClientId, setDetailsClientId] = useState(null);

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <ClientList setDetailsClientId={setDetailsClientId} />
        </div>
        <div className="col-sm-4">
          <ClientDetails detailsClientId={detailsClientId} />
        </div>
      </div>
    </div>
  );
}