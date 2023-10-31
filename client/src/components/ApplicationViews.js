import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute.js";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ServiceList from "./services/ServiceList.js";
import EmployeeList from "./employee/EmployeeList.js";
import ClientList from "./client /ClientList.js";
import WorkOrderList from "./workorders/WorkOrderList.js";
import  CreateWorkOrder  from "./workorders/CreateWorkOrder.js";
import CreateClient from "./client /CreateClient.js";
import CreateEmployee from "./employee/CreateEmployee.js";
import EditWorkOrder from "./workorders/EditWorkOrder.js";
import "./ApplicationViews.css"
import contact from "/Users/meganlee/workspace/csharp/LeeboysWildlife/client/src/Images/Contact.png";
import covered from "/Users/meganlee/workspace/csharp/LeeboysWildlife/client/src/Images/Counties.png";


const text =
  "Locally owned and operated. Leeboy's Wildlife Removal specializes in providing humane wildlife removal services. We are dedicated to safely and ethically removing wildlife, such as raccoons, squirrels, and birds, from residential and commercial properties. Our mission is to protect both your property and the well-being of the wildlife we encounter. With our experienced team, we strive to ensure a safe and harmonious coexistence between humans and wildlife.";

  const Home = () => {
    return (
      <div className="homepage">
        <div className="section">
          <p className="text">{text}</p>
        </div>
        <div className="section">
          <p className="hours-of-operation">
            <strong>Hours of Operation:</strong>
          <ul>
            <ul>Monday - Friday: 9:00 AM - 5:00 PM</ul>
            <ul>Saturday: Closed</ul>
            <ul>Sunday: Closed</ul>
          </ul>
          </p>
        </div>
        <div className="section">
          <img className="contact-image" src={contact} alt="Login Image" />
        </div>
        <div className="section">
          <div className="areas-covered">
            <strong>Areas Covered:</strong>
            <ul>
              <li>Baron</li>
              <li>Chippewa</li>
              <li>Dunn</li>
              <li>Eau Claire</li>
              <li>Pepin</li>
              <li>Pierce</li>
              <li>Polk</li>
              <li>St. Croix</li>
            </ul>
          <img className="areas-image" src={covered} alt="Covered Areas" />
          </div>
        </div>
      </div>
    );
  };
  

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="services" element={<ServiceList />} />
      <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
      <Route path="register" element={<Register setLoggedInUser={setLoggedInUser} />} />
      <Route
    path="workorders"
    element={
        <AuthorizedRoute  loggedInUser={loggedInUser}>
            <WorkOrderList />
        </AuthorizedRoute>
    }
    />
        <Route
          path="workorders/create"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <CreateWorkOrder />
            </AuthorizedRoute>
          }
        />
        <Route
  path="workorders/edit/:id"
  element={
    <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
      <EditWorkOrder />
    </AuthorizedRoute>
  }
/>

    
      <Route
        path="employees"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <EmployeeList />
          </AuthorizedRoute>
        }
      />
      <Route
        path="create-employee"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <CreateEmployee />
          </AuthorizedRoute>
        }
      />
      <Route
        path="clients"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <ClientList />
          </AuthorizedRoute>
        }
        />
       <Route
        path="create-client"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <CreateClient />
          </AuthorizedRoute>
        }
      />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}

