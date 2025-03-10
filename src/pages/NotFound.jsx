import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="mb-4">
            <span className="display-1 d-block text-primary">404</span>
          </div>
          <h1 className="h2 mb-3">Page Not Found</h1>
          <p className="text-muted mb-4">
            Oops! The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button variant="primary">
              <i className="bi bi-house-door me-2"></i>
              Back to Dashboard
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound; 