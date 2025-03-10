import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable component for form layouts with consistent styling
 */
const FormLayout = ({
  title,
  backUrl,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`form-container ${className}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">{title}</h2>
        {backUrl && (
          <a 
            href={backUrl} 
            className="btn btn-outline-secondary"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </a>
        )}
      </div>
      
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          {children}
        </Card.Body>
      </Card>
    </div>
  );
};

FormLayout.propTypes = {
  title: PropTypes.string.isRequired,
  backUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default FormLayout; 