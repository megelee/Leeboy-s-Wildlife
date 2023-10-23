import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute.js";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ServiceList from "./services/ServiceList.js";
import EmployeeList from "./employee/EmployeeList.js";
import ClientList from "./client /ClientList.js";
import WorkOrderList from "./workorders/WorkOrderList.js";


const text =
  "Leeboy's Wildlife Removal specializes in providing humane wildlife removal services. We are dedicated to safely and ethically removing wildlife, such as raccoons, squirrels, and birds, from residential and commercial properties. Our mission is to protect both your property and the well-being of the wildlife we encounter. With our experienced team, we strive to ensure a safe and harmonious coexistence between humans and wildlife.";

const Home = () => {
  return (
    <div className="homepage">
      <p className="text">"{text}"</p>
    </div>
  );
};

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
      <Route path="register" element={<Register setLoggedInUser={setLoggedInUser} />} />
      <Route path="services" element={<ServiceList />} />
      <Route
    path="workorders"
    element={
        <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <WorkOrderList />
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
        path="clients"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <ClientList />
          </AuthorizedRoute>
        }
      />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
