import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable component for form action buttons with consistent styling
 */
const FormActions = ({
  cancelUrl,
  cancelText = 'Cancel',
  submitText = 'Submit',
  isSubmitting = false,
  align = 'end',
  horizontal = false,
  labelSize = 3,
  className = '',
  ...props
}) => {
  if (horizontal) {
    return (
      <Row className={`mt-4 ${className}`} {...props}>
        <Col sm={{ span: 9, offset: 3 }}>
          <div className={`d-flex ${align === 'end' ? 'justify-content-end' : align === 'between' ? 'justify-content-between' : align === 'center' ? 'justify-content-center' : ''}`}>
            {cancelUrl && (
              <a href={cancelUrl} className="btn btn-outline-secondary me-2">
                {cancelText}
              </a>
            )}
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : submitText}
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
  
  return (
    <div className={`d-flex ${align === 'end' ? 'justify-content-end' : align === 'between' ? 'justify-content-between' : align === 'center' ? 'justify-content-center' : ''} mt-4 ${className}`} {...props}>
      {cancelUrl && (
        <a href={cancelUrl} className="btn btn-outline-secondary me-2">
          {cancelText}
        </a>
      )}
      <Button 
        type="submit" 
        variant="primary" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : submitText}
      </Button>
    </div>
  );
};

FormActions.propTypes = {
  cancelUrl: PropTypes.string,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  isSubmitting: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'end', 'center', 'between']),
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number,
  className: PropTypes.string
};

export default FormActions; 