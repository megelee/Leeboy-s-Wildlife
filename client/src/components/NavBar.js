import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { logout } from "../managers/authManager";
import logo from "/Users/meganlee/workspace/csharp/LeeboysWildlife/client/src/Images/Logo.png";
import "./NavBar.css";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  const handleLogout = () => {
    logout().then(() => {
      setLoggedInUser(null);
      setOpen(false); // Close the navbar after logout
    });
  };

  return (
    <div>
      <Navbar color="light" light fixed={true} expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          <img className="logo-image" src={logo} alt="Logo" />
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/services">
              Services
            </NavLink>
          </NavItem>
        </Nav>

        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/workorders">
                    Work Orders
                  </NavLink>
                </NavItem>
                {loggedInUser.roles.includes("Admin") && (
                  <>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/clients">
                        Clients
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/employees">
                        Employees
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                handleLogout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}

