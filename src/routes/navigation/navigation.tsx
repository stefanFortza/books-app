import { FunctionComponent, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser, signOutUser } from "../../utils/utils";

interface NavigationProps {}

const Navigation: FunctionComponent<NavigationProps> = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<number | null>(null);

  //TODO Add context
  useEffect(() => {
    getCurrentUser().then((currUser) => {
      setCurrentUser(currUser);
    });
  }, []);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <i
              style={{ width: "30px", height: "30px" }}
              className="bi bi-book d-inline-block align-top"
            ></i>
            Book Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/book")}>Book Page</Nav.Link>
              <Nav.Link onClick={() => navigate("/addBook")}>
                Add a book
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {currentUser ? (
                <Nav.Link onClick={() => signOutUser()}>Sign Out</Nav.Link>
              ) : (
                <Nav.Link onClick={() => navigate("/authentification")}>
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Navigation;
