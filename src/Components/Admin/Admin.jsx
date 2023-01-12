import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';

function AdminComponent() {

    const navigate = useNavigate();

    const handleBookings = () => {
        navigate("/admin/bookings");
    }

    const handleEmployees = () => {
        navigate("/admin/employees");
    }

    const handleUsers = () => {
        navigate("/admin/users");
    }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Administrator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleBookings}>Bookings</Nav.Link>
            <Nav.Link onClick={handleEmployees}>Employees</Nav.Link>
            <Nav.Link onClick={handleUsers}>Resgistered Users</Nav.Link>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminComponent;