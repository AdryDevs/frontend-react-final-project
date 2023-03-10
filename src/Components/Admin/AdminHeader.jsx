import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import './AdminHeader.scss';

function AdminHeader() {

  const navigate = useNavigate();

  const handleBookings = () => {
    navigate("/admin/bookings");
  }

  const handleUsers = () => {
    navigate("/admin/users");
  }

  return (
    <Navbar id='nav' bg="light" expand="lg">

      <Navbar.Brand>Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={handleBookings}>Bookings</Nav.Link>
          <Nav.Link onClick={handleUsers}>Resgistered Users</Nav.Link>


        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

export default AdminHeader;