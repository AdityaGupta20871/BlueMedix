import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable component for form groups with consistent styling
 */
const FormGroup = ({
  label,
  name,
  required = false,
  children,
  helpText,
  error,
  horizontal = false,
  className = '',
  labelSize = 3,
  controlSize = 9,
  ...props
}) => {
  const id = `form-${name}`;
  
  if (horizontal) {
    return (
      <Form.Group className={`mb-3 ${className}`} controlId={id} {...props}>
        <Row>
          <Form.Label column sm={labelSize} className="fw-medium text-md-end">
            {label} {required && <span className="text-danger">*</span>}
          </Form.Label>
          <Col sm={controlSize}>
            {children}
            {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
            {error && <div className="text-danger small mt-1">{error}</div>}
          </Col>
        </Row>
      </Form.Group>
    );
  }
  
  return (
    <Form.Group className={`mb-3 ${className}`} controlId={id} {...props}>
      <Form.Label className="fw-medium">
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      {children}
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
      {error && <div className="text-danger small mt-1">{error}</div>}
    </Form.Group>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  helpText: PropTypes.string,
  error: PropTypes.string,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
  labelSize: PropTypes.number,
  controlSize: PropTypes.number
};

export default FormGroup; 