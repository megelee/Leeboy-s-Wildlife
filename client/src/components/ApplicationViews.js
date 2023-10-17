import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ServiceList from "./services/ServiceList.js";
import ServiceDetails from "./services/ServiceDetails.js";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="register" element={<Register setLoggedInUser={setLoggedInUser} />} />
        <Route path="services" element={<ServiceList />} />
        <Route path="services/:serviceId" element={<ServiceDetails />} /> 
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
