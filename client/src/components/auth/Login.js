import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import "./Login.css";
import image from "/Users/meganlee/workspace/csharp/LeeboysWildlife/client/src/Images/Logo.png";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="container" style={{ maxWidth: "800px" }}>
        <h3>Login</h3>
        <FormGroup>
      <img className="homepage-image" src={image} alt="Login Image" />
          <Label>Email</Label>
          <Input
            invalid={failedLogin}
            type="text"
            value={email}
            onChange={(e) => {
              setFailedLogin(false);
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            invalid={failedLogin}
            type="password"
            value={password}
            onChange={(e) => {
              setFailedLogin(false);
              setPassword(e.target.value);
            }}
          />
          <FormFeedback>Login failed.</FormFeedback>
        </FormGroup>

        <Button color="dark red" onClick={handleSubmit}>
          Login
        </Button>
        <p>
          Not signed up? Register <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}
